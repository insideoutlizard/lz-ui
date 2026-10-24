<script lang="ts" module>
    export const title = "Components";
</script>

<script lang="ts">
    import { LzButton } from "#lib";
    import type { LzButtonColor } from "#lib";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">Components</h1>
            <a href="https://m3.material.io/components" target="_blank">Docs</a>
        </hgroup>
    </header>
</section>

<section class="lz-section primary">
    <div>
        <hgroup>
            <h2>Buttons</h2>
        </hgroup>
        <p>ToDo: Add link to buttons and perhaps some sort of image.</p>
    </div>
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

    #index-headline {
        font-family: var(--lz-typography-typeface-brand);
        font-size: var(--lz-typescale-display-l-font-size);
        letter-spacing: var(--lz-typescale-display-l-font-tracking);
        font-weight: var(--lz-typescale-display-l-font-weight);
        font-variation-settings: var(--lz-typescale-display-l-font-wght);
    }
</style>
