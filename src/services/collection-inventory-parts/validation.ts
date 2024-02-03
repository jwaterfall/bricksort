import { string, boolean, array, type InferType } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getCollectionInventoryPartsParams = infiniteScrollParams.shape({
  userId: string().required(),
  collectionInventoryId: string().required(),
  missingPartsOnly: boolean().default(false),
	color: array().of(string().required()).ensure().default([])
});

export type GetCollectionInventoryPartsParams = InferType<typeof getCollectionInventoryPartsParams>;
