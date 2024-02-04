import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import axios from 'axios';
import { invalidateAll } from '$app/navigation';
import { type PartListPart } from '$services/part-list-part';

async function addPartListPart(
	partListId: string,
	partId: string,
	colorId: string,
	quantity: number
) {
	const { origin } = window.location;
	const response = await axios.post<PartListPart | null>(
		`${origin}/api/part-lists/${partListId}/parts`,
		undefined,
		{
			params: {
				quantity,
				partId,
				colorId
			}
		}
	);

	return response.data;
}

export default (partListId: string, partId: string, colorId: string) =>
	createMutation({
		mutationFn: (quantity: number) => addPartListPart(partListId, partId, colorId, quantity),
		onSuccess: (newPart, quantity) => {
			invalidateAll();
			toast(quantity > 0 ? 'Added parts to list' : 'Removed parts from list', {
				description: `You now have ${newPart?.quantity ?? 0} of this part in your list`
			});
		},
		onError: () => {
			toast('Error adding to list', {
				description: 'There was an error adding parts to your list'
			});
		}
	});
