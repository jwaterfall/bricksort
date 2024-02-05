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
	import { type PartListInventoryPart } from "$services/part-list-inventory-part";
	import createAddPartListPartMutation from "$mutations/addPartListPart";

	export let partListInventoryPart: PartListInventoryPart;
	export let partListId: string;
	$: part = partListInventoryPart.element.part;
	$: addPartListPartMutation = createAddPartListPartMutation(partListId, partListInventoryPart.elementId);
	$: min = 0 - (partListInventoryPart.partListPart?.quantity ?? 0);
	$: max = partListInventoryPart.quantity - (partListInventoryPart.partListPart?.quantity ?? 0);

	let quantity = 1;
  let dialogOpen = false;
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<figure class="bg-white border-b">
		<Image 
			src={partListInventoryPart.element.imageUrl}
			alt={part.name}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full mix-blend-multiply"
		/>
	</figure>
	<Card.Header class="flex-1">
		<Card.Description> {partListInventoryPart.element.color.name} • {part.category.name}</Card.Description>
		<Card.Title class="line-clamp-2">{part.name}</Card.Title>
	</Card.Header>
	<Card.Footer class="items-end">
		<Tooltip.Root>
			<Tooltip.Trigger class="mr-auto">
				<Badge>
					<ToyBrick size={14} class="mr-1" />
					{partListInventoryPart.partListPart?.quantity ?? 0} of{' '}
					{partListInventoryPart.quantity}
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>
					{partListInventoryPart.partListPart?.quantity ?? 0} parts found out of{' '}
					{partListInventoryPart.quantity}
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
						{partListInventoryPart.partListPart?.quantity ?? 0} of{' '}
						{partListInventoryPart.quantity}
					</Dialog.Description>
				</Dialog.Header>
				<Label for="quantity">Quantity</Label>
				<div class="flex gap-2">
					<Input
						type="number"
						name="quantity"
						bind:value={quantity}
						min={min}
						max={max}
					/>
					<Button 
						disabled={$addPartListPartMutation.isPending || quantity > max || quantity < min || quantity === 0}
						on:click={() => {
							$addPartListPartMutation.mutate(quantity)
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
							$addPartListPartMutation.mutate(min)
							dialogOpen = false;
						}}
						disabled={$addPartListPartMutation.isPending || (partListInventoryPart.partListPart?.quantity ?? 0) === 0}
					>
						Remove all
					</Button>
					<Button
						variant="secondary"
						on:click={() => {
							$addPartListPartMutation.mutate(max)
							dialogOpen = false;
						}}
						disabled={$addPartListPartMutation.isPending || (partListInventoryPart.partListPart?.quantity ?? 0) === partListInventoryPart.quantity}
					>
						Found all
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</Card.Footer>
</Card.Root>
