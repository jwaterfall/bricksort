import { json, type RequestHandler } from '@sveltejs/kit'
import { Types } from 'mongoose';

import InventoryModel from '$models/Inventory';
import InventoryPartModel, { type InventoryPart } from '$models/InventoryPart';
import InventoryMinifigModel from '$models/InventoryMinifig';
import CollectionInventoryModel from '$models/CollectionInventory';
import CollectionInventoryPartModel from '$models/CollectionInventoryPart';

import { connectToDatabase } from '$lib/database'
import { handlePageAuth } from '$lib/auth';

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

export const POST: RequestHandler = async ({ request, locals }) => {
  const user = await handlePageAuth(locals);

  await connectToDatabase();

  const { setId } = await request.json()

  const inventory = await InventoryModel.findOne({ setId });

  if (!inventory) {
    return json(
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
    user: user.id,
    collectionInventoryId,
    inventoryPartId: inventoryPart._id,
    quantity: inventoryPart.quantity,
  }));

  const collectionInventory = new CollectionInventoryModel({
    _id: collectionInventoryId,
    user: user.id,
    inventoryId: inventory._id,
    partQuantity,
    sparePartQuantity,
  });

  await collectionInventory.save();
  await CollectionInventoryPartModel.insertMany(collectionInventoryParts);

  return json(collectionInventory);
}
