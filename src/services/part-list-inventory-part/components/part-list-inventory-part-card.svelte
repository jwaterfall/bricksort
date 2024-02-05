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

  import createAddPartListPartMutation from "$mutations/addPartListPart";
  import { type PartListInventoryPart } from "../";

  export let partListInventoryPart: PartListInventoryPart;
  export let partListId: string;

  let quantityToAdd = 1;
  let dialogOpen = false;
	
  $: ({ element: { part: { category, name } , imageUrl, color }, quantity, partListPart } = partListInventoryPart);
	$: quantityFound = partListPart?.quantity ?? 0;
  $: min = 0 - quantityFound;
  $: max = quantity - quantityFound;

  $: addPartListPartMutation = createAddPartListPartMutation(partListId, partListInventoryPart.elementId, () => { dialogOpen = false });
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<figure class="bg-white border-b">
		<Image 
			src={imageUrl}
			alt={name}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full mix-blend-multiply"
		/>
	</figure>
	<Card.Header class="flex-1">
		<Card.Description> {color.name} • {category.name}</Card.Description>
		<Card.Title class="line-clamp-2">{name}</Card.Title>
	</Card.Header>
	<Card.Footer class="items-end">
		<Tooltip.Root>
			<Tooltip.Trigger class="mr-auto">
				<Badge>
					<ToyBrick size={14} class="mr-1" />
					{quantityFound} of {quantity}
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>
					{quantityFound} parts found out of {quantity}
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
						{quantityFound} of {quantity}
					</Dialog.Description>
				</Dialog.Header>
				<Label for="quantity">Quantity</Label>
				<div class="flex gap-2">
					<Input
						type="number"
						name="quantity"
						bind:value={quantityToAdd}
						min={min}
						max={max}
					/>
					<Button 
						disabled={$addPartListPartMutation.isPending || quantityToAdd > max || quantityToAdd < min || quantityToAdd === 0}
						on:click={() => $addPartListPartMutation.mutate(quantityToAdd)}
					>
						{quantityToAdd > 0 ? 'Add' : 'Remove'}
					</Button>
				</div>
				<Dialog.Footer>
					<Button
						variant="destructive"
						disabled={$addPartListPartMutation.isPending || quantityFound === 0}
						on:click={() => $addPartListPartMutation.mutate(min)}
					>
						Remove all
					</Button>
					<Button
						variant="secondary"
						disabled={$addPartListPartMutation.isPending || quantityFound === quantity}
						on:click={() => $addPartListPartMutation.mutate(max)}
					>
						Found all
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</Card.Footer>
</Card.Root>
