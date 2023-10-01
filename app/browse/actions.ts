'use server';
import { Types } from 'mongoose';

import { connectToDatabase } from '@/utils/database';
import InventoryModel from '@/models/Inventory';
import InventoryPartModel, { InventoryPart } from '@/models/InventoryPart';
import InventoryMinifigModel from '@/models/InventoryMinifig';
import CollectionInventoryPartModel from '@/models/CollectionInventoryPart';
import CollectionInventoryModel from '@/models/CollectionInventory';
import { UserOptions } from '@/utils/pagination';

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

export interface CreateCollectionInventoryOptions extends UserOptions {
  setId: string;
}

export async function createCollectionInventory(options: CreateCollectionInventoryOptions): Promise<boolean> {
  await connectToDatabase();

  const { setId, user } = options;

  const inventory = await InventoryModel.findOne({ setId });

  if (!inventory) return false;

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
    user,
    collectionInventoryId,
    inventoryPartId: inventoryPart._id,
    quantity: inventoryPart.quantity,
  }));

  const collectionInventory = new CollectionInventoryModel({
    _id: collectionInventoryId,
    user,
    inventoryId: inventory._id,
    partQuantity,
    sparePartQuantity,
  });

  await collectionInventory.save();
  await CollectionInventoryPartModel.insertMany(collectionInventoryParts);

  return true;
}
