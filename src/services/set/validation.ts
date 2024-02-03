import { string, type InferType, array } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getSetsParams = infiniteScrollParams.shape({
	search: string().nullable(),
	theme: array().of(string().required()).ensure().default([])
});

export type GetSetsParams = InferType<typeof getSetsParams>;
