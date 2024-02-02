import { type InferType } from 'yup';
import { infiniteScrollParams } from '$lib/validation';

export const getSetsParams = infiniteScrollParams.shape({});

export type GetSetsParams = InferType<typeof getSetsParams>;
