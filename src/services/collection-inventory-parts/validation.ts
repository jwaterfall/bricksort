import { string, boolean, type InferType } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getCollectionInventoryPartsParams = infiniteScrollParams.shape({
  userId: string().required(),
  collectionInventoryId: string().required(),
  missingPartsOnly: boolean().default(false),
});

export type GetCollectionInventoryPartsParams = InferType<typeof getCollectionInventoryPartsParams>;
