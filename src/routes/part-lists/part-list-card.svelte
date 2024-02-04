<script lang="ts">
  import { ToyBrick, Trash } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import { Image } from "@unpic/svelte";
  import * as Card from "$lib/components/ui/card";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
	import createDeletePartListMutation from "$mutations/deletePartList";
	import { type PartList } from '$services/part-list';

	const deletePartListMutation = createDeletePartListMutation();

	export let partList: PartList;
	$: set = partList.inventory?.set!;
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<a href="/part-lists/{partList._id}/build" class="bg-white border-b">
		<Image 
			src={set.imageUrl}
			alt={set.name}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full mix-blend-multiply"
		/>
	</a>
	<Card.Header class="flex-1">
		<Card.Description> #{set._id.split('-')[0]} • {set.theme.name} • {set.year}</Card.Description>
		<a href="/part-lists/{partList._id}/build">
			<Card.Title class="line-clamp-2 hover:underline">{set.name}</Card.Title>
		</a>
	</Card.Header>
	<Card.Footer>
	  {#if set}
			<Tooltip.Root>
				<Tooltip.Trigger class="mr-auto">
					<Badge>
						<ToyBrick size={14} class="mr-1" />
						{partList.partQuantityFound} of{' '}
						{partList.partQuantity}
					</Badge>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>
						{partList.partQuantityFound} parts found out of{' '}
						{partList.partQuantity}
					</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/if}
		<Tooltip.Root>
			<Tooltip.Trigger class="ml-auto">
				<Button
					variant="ghost"
					size="icon"
					on:click={() =>
						toast('Are you sure?', {
							description: 'This will remove the set from your collection.',
							action: {
								label: 'Yes',
								onClick: () => {
									$deletePartListMutation.mutate(partList._id);
								},
							},
						})
					}
				>
					<Trash size={24} />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Remove from collection</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Card.Footer>
</Card.Root>
