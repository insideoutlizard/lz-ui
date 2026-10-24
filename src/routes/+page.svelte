<script lang="ts">
    import { LzButton } from "#lib";
    import type { LzButtonColor } from "#lib";
</script>

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
    <header class="page-header" id="index-header">
        <hgroup>
            <h1>lz-ui</h1>
            <p>
                Component library made with SvelteKit. Attempts to follow the
                official <a href="https://m3.material.io/" target="_blank"
                    >Material 3 docs
                </a>
                with improvements for traditional desktop websites.
            </p>
            <p>
                This project also implements Material 3
                <a
                    href="https://m3.material.io/foundations/design-tokens/overview"
                    target="_blank">design tokens</a
                > as CSS variables.
            </p>
        </hgroup>
    </header>
</section>

<section class="lz-section primary">
    <header class="lz-section-header">
        <hgroup>
            <h2>Quick links</h2>
        </hgroup>
    </header>

    <section class="lz-section nested">
        <a class="index-quick-link" href="/components">
            <header>
                <hgroup>
                    <h3>Components</h3>
                </hgroup>
            </header>
        </a>
        <a class="index-quick-link" href="/components">
            <header>
                <hgroup>
                    <h3>Styles</h3>
                </hgroup>
            </header>
        </a>
    </section>
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

    .page-header hgroup {
        & h1 {
            font-family: var(--lz-typography-typeface-brand);
            font-size: var(--lz-typescale-display-l-font-size);
            letter-spacing: var(--lz-typescale-display-l-font-tracking);
            font-weight: var(--lz-typescale-display-l-font-weight);
            font-variation-settings: var(--lz-typescale-display-l-font-wght);
        }

        & p {
            font-family: var(--lz-typography-typeface-plain);
            font-size: var(--lz-typescale-body-l-font-size);
            letter-spacing: var(--lz-typescale-body-l-font-tracking);
            font-weight: var(--lz-typescale-body-l-font-weight);
            font-variation-settings: var(--lz-typescale-body-l-font-wght);
        }
    }
</style>
