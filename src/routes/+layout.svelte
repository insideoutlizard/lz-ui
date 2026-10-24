<script lang="ts">
    import "./resets.css";
    import "./layout.css";

    import "#lib/styles/index.css";
    import { page } from "$app/state";

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);
</script>

<div id="app">
    {@render children()}
</div>
