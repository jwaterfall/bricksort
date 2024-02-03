<script lang="ts">
  import { ToyBrick, Plus } from "lucide-svelte";
  import { Image } from "@unpic/svelte";
	
  import * as Card from "$lib/components/ui/card";
  import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import type { CollectionInventoryPart } from '$models/CollectionInventoryPart';
	import createAddCollectionInventoryPartMutation from "$mutations/addCollectionInventoryPart";

	export let collectionInventoryPart: CollectionInventoryPart;
	$: part = collectionInventoryPart.inventoryPart.part;
	$: addCollectionInventoryPartMutation = createAddCollectionInventoryPartMutation(collectionInventoryPart._id);

	let quantity = 1;
  let dialogOpen = false;
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<figure class="bg-white border-b">
		<Image 
			src={collectionInventoryPart.inventoryPart.imageUrl}
			alt={part.name}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full mix-blend-multiply"
		/>
	</figure>
	<Card.Header class="flex-1">
		<Card.Description> {collectionInventoryPart.inventoryPart.color.name} • {part.category.name}</Card.Description>
		<Card.Title class="line-clamp-2">{part.name}</Card.Title>
	</Card.Header>
	<Card.Footer class="items-end">
		<Tooltip.Root>
			<Tooltip.Trigger class="mr-auto">
				<Badge>
					<ToyBrick size={14} class="mr-1" />
					{collectionInventoryPart.quantityFound} of{' '}
					{collectionInventoryPart.quantity}
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>
					{collectionInventoryPart.quantityFound} parts found out of{' '}
					{collectionInventoryPart.quantity}
				</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Dialog.Root bind:open={dialogOpen}>
			<Dialog.Trigger>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							variant="ghost"
							size="icon"
						>
							<Plus size={24} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Add or remove parts</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Add or remove parts</Dialog.Title>
					<Dialog.Description>
						{collectionInventoryPart.quantityFound} of{' '}
						{collectionInventoryPart.quantity} found
					</Dialog.Description>
				</Dialog.Header>
				<Label for="quantity">Quantity</Label>
				<div class="flex gap-2">
					<Input
						type="number"
						name="quantity"
						bind:value={quantity}
						min={0 - collectionInventoryPart.quantityFound}
						max={
							collectionInventoryPart.quantity -
							collectionInventoryPart.quantityFound
						}
					/>
					<Button 
						disabled={$addCollectionInventoryPartMutation.isPending}
						on:click={() => {
							$addCollectionInventoryPartMutation.mutate(quantity)
							dialogOpen = false;
						}}
					>
						{quantity > 0 ? 'Add' : 'Remove'}
					</Button>
				</div>
				<Dialog.Footer>
					<Button
						variant="destructive"
						on:click={() => {
							$addCollectionInventoryPartMutation.mutate(
								-collectionInventoryPart.quantityFound
							)
							dialogOpen = false;
						}}
						disabled={$addCollectionInventoryPartMutation.isPending || collectionInventoryPart.quantityFound === 0}
					>
						Remove all
					</Button>
					<Button
						variant="secondary"
						on:click={() => {
							$addCollectionInventoryPartMutation.mutate(
								collectionInventoryPart.quantity -
									collectionInventoryPart.quantityFound
							)
							dialogOpen = false;
						}}
						disabled={$addCollectionInventoryPartMutation.isPending || collectionInventoryPart.quantityFound === collectionInventoryPart.quantity}
					>
						Found all
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</Card.Footer>
</Card.Root>
