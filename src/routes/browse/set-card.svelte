<script lang="ts">
  import { ToyBrick, Blocks, BookmarkPlus } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import { Image } from "@unpic/svelte";

  import { page } from '$app/stores';
  import * as Card from "$lib/components/ui/card";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
	import type { Set } from '$models/Set';

	export let set: Set;
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<a href="/sets/{set._id}" class="dark:bg-white">
		<Image 
			src={set.imageUrl}
			alt={set.name}
			width={256}
			aspectRatio={16 / 9}
			objectFit="contain"
			class="p-4 w-full mix-blend-multiply"
		/>
	</a>
	<Card.Header class="flex-1">
		<Card.Description> #{set._id.split('-')[0]} • {set.theme.name} • {set.year}</Card.Description>
		<a href="/sets/{set._id}">
			<Card.Title class="line-clamp-2 hover:underline">{set.name}</Card.Title>
		</a>
	</Card.Header>
	<Card.Footer class="items-end">
		<Tooltip.Root>
			<Tooltip.Trigger class="mr-auto">
				<Badge>
					<ToyBrick size={14} class="mr-1" />
					{set.partCount}
				</Badge>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{set.partCount} pieces</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					variant="ghost"
					size="icon"
					on:click={() =>
						toast('Added to collection', {
							description: 'Go to your collection to start adding parts',
						})
					}
				>
					<Blocks size={24} />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Add to collection</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					variant="ghost"
					size="icon"
					on:click={() =>
						toast('Added to wishlist', {
							description: 'You can view your wishlist in your profile',
						})
					}
				>
					<BookmarkPlus size={24} />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Add to wishlist</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Card.Footer>
</Card.Root>