<script lang="ts">
    import { page } from "$app/state";

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);
</script>

<div id="app">
    {@render children()}
</div>
