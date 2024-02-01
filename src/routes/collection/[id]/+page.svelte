<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import { Label } from "$lib/components/ui/label";
  import CollectionInventoryPartCard from './collection-inventory-part-card.svelte';
	import type { PageData } from './$types';

  export let data: PageData;
  $: pages = parseInt($page.url.searchParams.get('pages') ?? '1');
  $: missingPartsOnly = $page.url.searchParams.get('missingPartsOnly') === 'true';

  function onCheckedChange(missingPartsOnly: boolean) {
    const url = new URL($page.url);

    if (missingPartsOnly) {
      url.searchParams.set('missingPartsOnly', 'true');
    } else {
      url.searchParams.delete('missingPartsOnly');
    }

    goto(`?${url.searchParams.toString()}`);
  }
</script>

<div class="flex items-center justify-end gap-4 mb-4">
  <div class="flex items-center gap-2">
    <Label for="airplane-mode">Missing parts only</Label>
    <Switch id="airplane-mode" checked={missingPartsOnly} {onCheckedChange} />
  </div>
</div>
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