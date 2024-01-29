<script lang="ts">
  import { ToyBrick, Trash } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import { Image } from "@unpic/svelte";

  import { page } from '$app/stores';
  import * as Card from "$lib/components/ui/card";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
	import type { CollectionInventory } from '$models/CollectionInventory';

	export let collectionInventory: CollectionInventory;

	$: set = collectionInventory.inventory.set;
</script>

<Card.Root class="flex flex-col">
	<a href="/collection/{collectionInventory._id}">
		<Image 
			src={set.imageUrl}
			alt={set.name}
			width={256}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full"
		/>
	</a>
	<Card.Header class="flex-1">
		<Card.Description> #{set._id.split('-')[0]} • {set.theme.name} • {set.year}</Card.Description>
		<a href="/collection/{collectionInventory._id}">
			<Card.Title class="line-clamp-2 hover:underline">{set.name}</Card.Title>
		</a>
	</Card.Header>
	<Card.Footer class="items-end">
		<Tooltip.Root>
			<Tooltip.Trigger class="mr-auto">
				<Badge>
					<ToyBrick size={14} class="mr-1" />
					{collectionInventory.partQuantityFound} of{' '}
					{collectionInventory.partQuantity}
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>
					{collectionInventory.partQuantityFound} parts found out of{' '}
					{collectionInventory.partQuantity}
				</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					variant="ghost"
					size="icon"
					on:click={() =>
						toast('Are you sure?', {
							description: 'This will remove the set from your collection.',
							action: {
								label: 'Yes',
								onClick: () => console.log('Removed from collection'),
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
