import { object, number } from 'yup';

export const infiniteScrollParams = object({
	pages: number().default(1),
	limit: number().min(1).max(24).default(24)
});