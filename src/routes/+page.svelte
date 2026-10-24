<script lang="ts">
    import { LzButton } from "#lib";
</script>

<h1>Welcome to your library project</h1>
<p>
    Create your package using @sveltejs/package and preview/showcase your work
    with SvelteKit
</p>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>

<div class="container">
    <LzButton label="x-small" />
    <LzButton label="small" />
    <LzButton label="medium" />
    <LzButton label="large" />
    <LzButton label="x-large" />
</div>

<style>
    .container {
        display: flex;
        gap: 1rem;
    }
</style>
