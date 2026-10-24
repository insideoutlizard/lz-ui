<script lang="ts" module>
    export const title = "Buttons";
</script>

<script lang="ts">
    import { LzButton } from "#lib";
    import type { LzButtonColor } from "#lib";

    import TestIcon from "~icons/material-symbols/adb-outline-sharp";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">Buttons</h1>
            <a
                href="https://m3.material.io/components/buttons/overview"
                target="_blank"
                >Docs
            </a>
        </hgroup>
    </header>
</section>

{#snippet buttons()}
    <div class="container">
        <hgroup>
            <h3>Standard</h3>
        </hgroup>
        <div class="container-inner">
            <LzButton size="x-small" color="filled">Extra small</LzButton>
            <LzButton size="small" color="tonal">Small (default)</LzButton>
            <LzButton size="medium" color="elevated">Medium</LzButton>
            <LzButton size="large" color="outlined">Large</LzButton>
            <LzButton size="x-large" color="text">Extra large</LzButton>
        </div>
    </div>
{/snippet}

<section class="lz-section primary">
    {@render buttons()}
</section>

<style>
    .container {
        background: var(--lz-color-surface-container-highest);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--lz-spacing-space200);
        gap: var(--lz-spacing-space200);
        overflow: hidden;
        box-sizing: border-box;
        flex: 1 1 auto;
        min-height: 0;
        min-width: 0;
        container: layout;
        container-type: inline-size;

        & .container-inner {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            gap: var(--lz-spacing-space200);
            width: 100%;
            margin-top: auto;
            flex-wrap: wrap;
        }
    }
</style>
