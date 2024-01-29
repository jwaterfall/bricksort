<script>
	import { ModeWatcher } from 'mode-watcher';

	import { Toaster } from "$lib/components/ui/sonner";
  import Navbar from "./navbar.svelte";
  import Footer from "./footer.svelte";
	import '../app.pcss';
</script>

<div class="bg-background text-foreground min-h-screen flex flex-col">
  <Navbar />
	<main class="flex-1 container p-4">
		<slot />
	</main>
  <Footer />
</div>
<Toaster />
<ModeWatcher />
