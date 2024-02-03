<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import QueryParamLink from '$lib/components/query-param-link.svelte';
  import { createQueryParamStore, QueryParamType } from '$lib/query-params';
  import CollectionInventoryCard from './collection-inventory-card.svelte';
	import type { PageData } from './$types';

  export let data: PageData;

  const pages = createQueryParamStore('pages', QueryParamType.Number);
</script>

<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  {#each data.items as collectionInventory}
    <CollectionInventoryCard {collectionInventory} />
  {/each}
</div>
{#if data.pageCount > ($pages ?? 1)}
  <QueryParamLink key="pages" value={($pages ?? 1) + 1}>
    <Button variant="outline" class="w-full mt-4">
      Load more
    </Button>
  </QueryParamLink>
{/if}