import { string, type InferType } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getpartListsParams = infiniteScrollParams.shape({
	userId: string().required()
});

export type GetpartListsParams = InferType<typeof getpartListsParams>;
