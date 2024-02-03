<script lang="ts">
  import { page } from '$app/stores';
	import { FilterX } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
	import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select'; 
  import * as Tooltip from "$lib/components/ui/tooltip";
  import QueryParamLink from '$lib/components/query-param-link.svelte';
  import { createQueryParamStore, QueryParamType } from '$lib/query-params';
  import SetCard from './set-card.svelte';
	import type { PageData } from './$types';

  export let data: PageData;

  const pages = createQueryParamStore('pages', QueryParamType.Number);
  const theme = createQueryParamStore('theme', QueryParamType.Array, []);
  const search = createQueryParamStore('search');

  $: selectedThemes = $theme.reduce((acc, value) => {
    const theme = data.themes.find(t => t._id === value);

    if (theme) {
      acc.push({ value, label: theme.name });
    }

    return acc;
  }, [] as { value: string; label: string }[]);
</script>

<div class="flex items-end gap-4 mb-4 py-2">
  <div class="flex flex-col gap-1.5">
    <Label for="search">Search</Label>
    <Input id="search" class="min-w-[20rem]" placeholder="Search by set number or name..." bind:value={$search} />
  </div>
  <div class="flex flex-col gap-1.5">
    <Label for="theme">Theme</Label>
    <Select.Root multiple
      selected={selectedThemes}
      onSelectedChange={(values) => theme.set(values?.map((v) => v.value) ?? [])}
    >
      <Select.Trigger class="w-[180px]">
        <Select.Value placeholder="All themes" />
      </Select.Trigger>
      <Select.Content id="theme" class="max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-popover">
        {#each data.themes as theme}
          <Select.Item value={theme._id}>{theme.name}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
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
<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  {#each data.items as set}
    <SetCard {set} />
  {/each}
</div>
{#if data.pageCount > ($pages ?? 1)}
  <QueryParamLink key="pages" value={($pages ?? 1) + 1}>
    <Button variant="outline" class="w-full mt-4">
      Load more
    </Button>
  </QueryParamLink>
{/if}