<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button";
  import CollectionInventoryPartCard from './collection-inventory-part-card.svelte';
	import type { PageData } from './$types';

  export let data: PageData;
  $: pages = parseInt($page.url.searchParams.get('pages') ?? '1');
</script>

<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  {#each data.items as collectionInventoryPart}
    <CollectionInventoryPartCard {collectionInventoryPart} />
  {/each}
</div>
{#if data.pageCount > pages}
  <a href="?pages={pages + 1}" class="block mt-4" data-sveltekit-noscroll>
    <Button variant="outline" class="w-full">
      Load more
    </Button>
  </a>
{/if}