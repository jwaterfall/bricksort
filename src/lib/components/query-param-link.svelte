<script lang="ts">
	import { page } from '$app/stores';

	export let key: string;
	export let value: string | number | boolean;

	$: url = new URL($page.url);
  $: url.searchParams.set(key, value.toString());
</script>

<a href={url.toString()}>
	<slot />
</a>
