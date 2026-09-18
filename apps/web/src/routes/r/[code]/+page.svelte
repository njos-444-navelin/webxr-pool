<script lang="ts">
	import { page } from '$app/state';

	// Phase 2 mounts the Babylon scene here (inside onMount, never at module level).
	const code = $derived(page.params.code);
</script>

<h1>Room {code}</h1>
<p>The game session will mount here.</p>
