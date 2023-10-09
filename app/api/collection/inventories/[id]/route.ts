import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

import { connectToDatabase } from '@/lib/utils';
import InventoryModel from '@/models/Inventory';
import InventoryPartModel, { InventoryPart } from '@/models/InventoryPart';
import InventoryMinifigModel from '@/models/InventoryMinifig';
import CollectionInventoryModel from '@/models/CollectionInventory';
import CollectionInventoryPartModel from '@/models/CollectionInventoryPart';

async function getInventoryMinifigInventoryParts(inventoryId: string) {
  const inventoryMinifigs = await InventoryMinifigModel.find({ inventoryId });

  const inventories = await InventoryModel.find({
    setId: { $in: inventoryMinifigs.map((inventoryMinifig) => inventoryMinifig.minifigId) },
  });

  const inventoryParts = await InventoryPartModel.find({
    inventoryId: { $in: inventories.map((inventory) => inventory._id) },
  });

  return inventoryMinifigs.flatMap((inventoryMinifig) => {
    const inventory = inventories.find((inventory) => inventory.setId === inventoryMinifig.minifigId);

    if (!inventory) return [];

    const currentInventoryParts = inventoryParts.filter((inventoryPart) => inventoryPart.inventoryId === inventory._id);

    currentInventoryParts.forEach((inventoryPart) => {
      inventoryPart.quantity *= inventoryMinifig.quantity;
    });

    return currentInventoryParts;
  });
}

function deduplicateInventoryParts(inventoryParts: InventoryPart[]) {
  const deduplicatedInventoryParts = new Map<string, InventoryPart>();

  inventoryParts.forEach((inventoryPart) => {
    const key = inventoryPart.partId + inventoryPart.colorId + inventoryPart.isSpare;

    if (deduplicatedInventoryParts.has(key)) {
      deduplicatedInventoryParts.get(key)!.quantity += inventoryPart.quantity;
    } else {
      deduplicatedInventoryParts.set(key, inventoryPart);
    }
  });

  return Array.from(deduplicatedInventoryParts.values());
}

export const GET = withApiAuthRequired(async (request: NextRequest, { params }) => {
  await connectToDatabase();

  const { user } = (await getSession()) as Session;

  const setId = params!.id as string;

  const inventory = await InventoryModel.findOne({ setId });

  if (!inventory) {
    return NextResponse.json(
      {
        message: `Inventory for set ${setId} not found`,
      },
      { status: 404 }
    );
  }

  const inventoryParts = await InventoryPartModel.find({ inventoryId: inventory._id });
  const minifigInventoryParts = await getInventoryMinifigInventoryParts(inventory._id);

  const deduplicatedInventoryParts = deduplicateInventoryParts([...inventoryParts, ...minifigInventoryParts]);

  const collectionInventoryId = new Types.ObjectId();

  const partQuantity = deduplicatedInventoryParts.reduce((total, inventoryPart) => {
    if (inventoryPart.isSpare) return total;
    return total + inventoryPart.quantity;
  }, 0);

  const sparePartQuantity = deduplicatedInventoryParts.reduce((total, inventoryPart) => {
    if (!inventoryPart.isSpare) return total;
    return total + inventoryPart.quantity;
  }, 0);

  const collectionInventoryParts = deduplicatedInventoryParts.map((inventoryPart) => ({
    user: user.sub,
    collectionInventoryId,
    inventoryPartId: inventoryPart._id,
    quantity: inventoryPart.quantity,
  }));

  const collectionInventory = new CollectionInventoryModel({
    _id: collectionInventoryId,
    user: user.sub,
    inventoryId: inventory._id,
    partQuantity,
    sparePartQuantity,
  });

  await collectionInventory.save();
  await CollectionInventoryPartModel.insertMany(collectionInventoryParts);

  return NextResponse.json(collectionInventory);
});

export const DELETE = withApiAuthRequired(async (request: NextRequest, { params }) => {
  await connectToDatabase();

  const { user } = (await getSession()) as Session;

  const collectionInventory = await CollectionInventoryModel.findOneAndDelete({
    _id: params!.id as string,
    user: user.sub,
  });

  return NextResponse.json(collectionInventory);
});
