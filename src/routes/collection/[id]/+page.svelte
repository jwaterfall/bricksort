<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import { Label } from "$lib/components/ui/label";
  import QueryParamLink from '$lib/components/query-param-link.svelte';
  import { createQueryParamStore, QueryParamType } from '$lib/query-params';
  import CollectionInventoryPartCard from './collection-inventory-part-card.svelte';
	import type { PageData } from './$types';

  export let data: PageData;

  const pages = createQueryParamStore('pages', QueryParamType.Number);
  const missingPartsOnly = createQueryParamStore('missingPartsOnly', QueryParamType.Boolean, false);
</script>

<div class="flex items-center justify-end gap-4 mb-4 py-2">
  <div class="flex items-center gap-2">
    <Label for="missing-parts-only">Missing parts only</Label>
    <Switch id="missing-parts-only" bind:checked={$missingPartsOnly} />
  </div>
</div>
<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  {#each data.items as collectionInventoryPart}
    <CollectionInventoryPartCard {collectionInventoryPart} />
  {/each}
</div>
{#if data.pageCount > ($pages ?? 1)}
  <QueryParamLink key="pages" value={($pages ?? 1) + 1}>
    <Button variant="outline" class="w-full mt-4">
      Load more
    </Button>
  </QueryParamLink>
{/if}