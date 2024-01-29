<script lang="ts">
	import { onMount } from 'svelte';
  import { handleSignIn } from '$lib/auth';

  onMount(() => handleSignIn("/"));
</script>