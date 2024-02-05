<script lang="ts">
  import { ToyBrick, Blocks } from "lucide-svelte";
  import { Image } from "@unpic/svelte";

  import * as Card from "$lib/components/ui/card";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";

	import createAddPartListMutation from '$mutations/addPartList';
	import type { Set } from '../';

	export let set: Set;

	$: ({ _id, name, imageUrl, partCount, theme, year } = set);

	const addPartListMutation = createAddPartListMutation();
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<a href="/sets/{_id}" class="bg-white border-b">
		<Image 
			src={imageUrl}
			alt={name}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full mix-blend-multiply"
		/>
	</a>
	<Card.Header class="flex-1">
		<Card.Description> #{_id.split('-')[0]} • {theme.name} • {year}</Card.Description>
		<a href="/sets/{_id}">
			<Card.Title class="line-clamp-2 hover:underline">{name}</Card.Title>
		</a>
	</Card.Header>
	<Card.Footer class="items-end">
		<Tooltip.Root>
			<Tooltip.Trigger class="mr-auto">
				<Badge>
					<ToyBrick size={14} class="mr-1" />
					{partCount}
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{partCount} pieces</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					variant="ghost"
					size="icon"
					disabled={$addPartListMutation.isPending}
					on:click={() => $addPartListMutation.mutate(_id)}
				>
					<Blocks size={24} />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Build this set</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Card.Footer>
</Card.Root>