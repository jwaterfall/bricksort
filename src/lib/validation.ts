import { object, number } from 'yup';

export const infiniteScrollParams = object({
	pages: number().default(1),
	limit: number().default(24)
});