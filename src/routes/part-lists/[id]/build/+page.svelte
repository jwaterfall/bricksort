<script lang="ts">
  import { FilterX } from "lucide-svelte";
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import { Label } from "$lib/components/ui/label";
  import * as Select from '$lib/components/ui/select';
  import * as Tooltip from "$lib/components/ui/tooltip";
  import QueryParamLink from '$lib/components/query-param-link.svelte';
  import { createQueryParamStore, QueryParamType } from '$lib/query-params';
  import { PartListInventoryPartCard } from '$services/part-list-inventory-part';
	import type { PageData } from './$types';

  export let data: PageData;

  const pages = createQueryParamStore('pages', QueryParamType.Number);
  const missingPartsOnly = createQueryParamStore('missingPartsOnly', QueryParamType.Boolean, false);
  const color = createQueryParamStore('color', QueryParamType.Array, []);

  $: selectedColors = $color.reduce((acc, value) => {
    const color = data.colors.find(c => c._id === value);

    if (color) {
      acc.push({ value, label: color.name });
    }

    return acc;
  }, [] as { value: string; label: string }[]);
</script>

<div class="flex items-end justify-between gap-4 mb-4 py-2">
  <div class="flex flex-col gap-1.5">
    <Label for="color">Colour</Label>
    <Select.Root multiple
      selected={selectedColors}
      onSelectedChange={(values) => color.set(values?.map((v) => v.value) ?? [])}
    >
      <Select.Trigger class="w-[180px]">
        <Select.Value placeholder="All colours" />
      </Select.Trigger>
      <Select.Content id="color" class="max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-popover">
        {#each data.colors as color}
          <Select.Item value={color._id}>{color.name}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2">
      <Label for="missing-parts-only">Missing parts only</Label>
      <Switch id="missing-parts-only" bind:checked={$missingPartsOnly} />
    </div>
    <Tooltip.Root>
      <Tooltip.Trigger class="ml-auto">
        <a href={$page.url.pathname}>
          <Button
            variant="destructive"
            size="icon"
          >
            <FilterX size={24} />
          </Button>
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Clear filters
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
</div>
<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  {#each data.items as partListInventoryPart}
    <PartListInventoryPartCard {partListInventoryPart} partListId={data.partListId} />
  {/each}
</div>
{#if data.pageCount > ($pages ?? 1)}
  <QueryParamLink key="pages" value={($pages ?? 1) + 1}>
    <Button variant="outline" class="w-full mt-4">
      Load more
    </Button>
  </QueryParamLink>
{/if}