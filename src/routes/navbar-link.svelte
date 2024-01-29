<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let exact = false;

	let active = false;

	$: active = exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
</script>

<a
	{href}
	class="h-16 px-6 text-sm flex gap-2 items-center font-medium transition-all duration-75 text-muted-foreground hover:text-foreground"
	class:text-primary={active}
>
	<slot />
</a>
