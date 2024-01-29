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
	<div class="bg-background text-foreground min-h-screen flex flex-col">
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
