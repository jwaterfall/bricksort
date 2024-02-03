<script>
	import { ModeWatcher } from 'mode-watcher';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'

	import { Toaster } from "$lib/components/ui/sonner";
  import Navbar from "./navbar.svelte";
  import Footer from "./footer.svelte";
	import '../app.pcss';

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
	<div class="bg-background text-foreground h-screen flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-accent scrollbar-track-background">
		<Navbar />
		<main class="flex-1 container p-4">
			<slot />
		</main>
		<Footer />
	</div>
	<Toaster />
	<ModeWatcher />
	<SvelteQueryDevtools />
</QueryClientProvider>
