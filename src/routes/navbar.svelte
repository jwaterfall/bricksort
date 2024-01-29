<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Home, Blocks, Bookmark, Search, Moon, Sun } from 'lucide-svelte';
  import { signOut } from '@auth/sveltekit/client';
  import { Image } from "@unpic/svelte";

  import { page } from '$app/stores';
  import { handleSignIn } from '$lib/auth';
  import { Button } from "$lib/components/ui/button";
	import NavbarLink from "./navbar-link.svelte";
</script>

<header class="border-b">
	<div class="container px-4 flex justify-between items-center">
		<a href="/" class="text-xl font-semibold tracking-tighter flex gap-2 items-center">
			<Image
				width={32}
				height={32}
				src="/logo.png"
				alt="Bricksort"
			/>
			Bricksort
		</a>
		<div class="flex gap-4 items-center">
			<nav class="flex divide-x border-x">
				<NavbarLink href="/" exact>
					<Home size={24} />
					Home
				</NavbarLink>
				<NavbarLink href="/browse" exact>
					<Search size={24} />
					Browse
				</NavbarLink>
				<NavbarLink href="/collection">
					<Blocks size={24} />
					Collection
				</NavbarLink>
				<NavbarLink href="/wishlist">
					<Bookmark size={24} />
					Wishlist
				</NavbarLink>
			</nav>
			<Button
				size="icon"
				variant="ghost"
				on:click={toggleMode}
			>
				{#if $mode === 'dark'}
					<Moon size={24} />
				{:else}
					<Sun size={24} />
				{/if}
			</Button>
			{#if $page.data.session}
				<Button variant="outline" on:click={() => signOut()}
				>
					Sign out
				</Button>
				{#if $page.data.session.user?.image}
					<Image
						width={40}
						height={40}
						src={$page.data.session.user.image}
						alt="Profile picture"
						class="rounded-full"
					/>
				{/if}
			{:else}
				<Button variant="outline" on:click={() => handleSignIn()}>
					Sign in
				</Button>
			{/if}
		</div>
	</div>
</header>