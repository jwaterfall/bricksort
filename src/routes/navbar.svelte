<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Home, Blocks, Bookmark, Search, Moon, Sun, ChevronDown } from 'lucide-svelte';
  import { Image } from "@unpic/svelte";

  import { page } from '$app/stores';
  import { handleSignIn, handleSignOut } from '$lib/auth';
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Avatar from "$lib/components/ui/avatar";
	import NavbarLink from "./navbar-link.svelte";

	function initials(name: string) {
		const nameParts = name.split(" ");
		return nameParts.map((part) => part[0]).join("");
	}
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
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="group flex items-center gap-1">
						<Avatar.Root class="group-hover:border-primary border-2">
							<Avatar.Image src={$page.data.session.user?.image} />
							{#if $page.data.session.user?.name}
								<Avatar.Fallback>
									{initials($page.data.session.user.name)}
								</Avatar.Fallback>
							{/if}
						</Avatar.Root>
						<ChevronDown size={18} class="text-muted-foreground group-hover:text-foreground" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={() => handleSignOut("/")} class="cursor-pointer">
								Sign out
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button variant="outline" on:click={() => handleSignIn()}>
					Sign in
				</Button>
			{/if}
		</div>
	</div>
</header>