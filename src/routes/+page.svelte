<script lang="ts">
    import { LzButton } from "#lib";
    import type { LzButtonColor } from "#lib";
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

{#snippet buttons(color: LzButtonColor)}
    <div class="container">
        <hgroup>
            <h3>{color.charAt(0).toUpperCase() + color.slice(1)}</h3>
        </hgroup>
        <div class="container-inner">
            <LzButton label="x-small" {color} />
            <LzButton label="small" {color} />
            <LzButton label="medium" {color} />
            <LzButton label="large" {color} />
            <LzButton label="x-large" {color} />
        </div>
    </div>
{/snippet}

<section class="lz-section primary">
    <hgroup>
        <h2>Buttons</h2>
    </hgroup>

    {@render buttons("filled")}
    {@render buttons("tonal")}
    {@render buttons("elevated")}
    {@render buttons("outlined")}
    {@render buttons("text")}
</section>

<style>
    .lz-section {
        display: flex;
        flex-direction: column;
        padding: var(--lz-spacing-space200);
        gap: var(--lz-spacing-space200);
    }
    .container {
        background: var(--lz-color-surface-container-highest);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--lz-spacing-space200);

        & .container-inner {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            gap: var(--lz-spacing-space200);
        }
    }
</style>
