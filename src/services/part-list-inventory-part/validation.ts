import { string, boolean, type InferType, array } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getPartListInventoryPartsParams = infiniteScrollParams.shape({
	userId: string().required(),
	partListId: string().required(),
	missingPartsOnly: boolean().default(false),
	color: array().of(string().required()).ensure().default([])
});

export type GetPartListInventoryPartsParams = InferType<typeof getPartListInventoryPartsParams>;
