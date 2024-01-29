<script>
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { Home, Blocks, Bookmark, Search, Moon, Sun } from 'lucide-svelte';
  import { Image } from "@unpic/svelte";

	import { Toaster } from "$lib/components/ui/sonner";
  import { Button } from "$lib/components/ui/button";
	import NavbarLink from "./NavbarLink.svelte";
	import '../app.pcss';
</script>

<div class="bg-background text-foreground">
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
          on:click={toggleMode}
        >
          {#if $mode === 'dark'}
            <Moon size={24} />
          {:else}
            <Sun size={24} />
          {/if}
        </Button>
      </div>
    </div>
  </header>
	<main class="container p-4">
		<slot />
		<Toaster />
		<ModeWatcher />
	</main>
	<footer class="border-t">
		<div class="container px-4 py-8 text-muted-foreground text-sm font-medium text-center">
			©2024 Jack Waterfall
		</div>
	</footer>
</div>
