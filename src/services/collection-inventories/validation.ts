import { string, type InferType } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getCollectionInventoriesParams = infiniteScrollParams.shape({
  userId: string().required(),
});

export type GetCollectionInventoriesParams = InferType<typeof getCollectionInventoriesParams>;
