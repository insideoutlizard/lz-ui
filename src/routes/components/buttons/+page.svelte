<script lang="ts" module>
    export const title = "Buttons";
</script>

<script lang="ts">
    import { LzButton } from "#lib";
    import type { LzButtonColor } from "#lib";
</script>

<hgroup>
    <h1 id="index-headline">Buttons</h1>
    <a href="https://m3.material.io/components/buttons/overview" target="_blank"
        >Docs
    </a>
</hgroup>

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

        &.primary h2 {
            font-family: var(--lz-typography-typeface-brand);
            font-size: var(--lz-typescale-headline-l-font-size);
            letter-spacing: var(--lz-typescale-headline-l-font-tracking);
            font-weight: var(--lz-typescale-headline-l-font-weight);
            font-variation-settings: var(--lz-typescale-headline-l-font-wght);
        }
    }

    .container {
        background: var(--lz-color-surface-container-highest);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--lz-spacing-space200);
        gap: var(--lz-spacing-space200);

        & .container-inner {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            gap: var(--lz-spacing-space200);
        }
    }

    #index-headline {
        font-family: var(--lz-typography-typeface-brand);
        font-size: var(--lz-typescale-display-l-font-size);
        letter-spacing: var(--lz-typescale-display-l-font-tracking);
        font-weight: var(--lz-typescale-display-l-font-weight);
        font-variation-settings: var(--lz-typescale-display-l-font-wght);
    }
</style>
