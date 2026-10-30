<script lang="ts" module>
    import PageIcon from "~icons/material-symbols/style-outline-sharp";
    import ActivePageIcon from "~icons/material-symbols/style-sharp";

    export const label = "Styles";
    export const icon = PageIcon;
    export const activeIcon = ActivePageIcon;
</script>

<script lang="ts">
    import { LzButton, LzCard } from "#lib";
    import type { LzButtonColor } from "#lib";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">Styles</h1>
            <a
                href="https://m3.material.io/styles"
                target="_blank"
                rel="noopener noreferrer">Docs</a
            >
        </hgroup>
    </header>
</section>

{#snippet color()}
    <LzCard variant="filled" href="/styles/color">
        <header>
            <h3 class="headline">Colour</h3>
        </header>

        <p class="supporting-text">
            Button groups are clustered, related buttons that offer a choice
            among options.
        </p>
    </LzCard>
{/snippet}

<section class="lz-section primary" id="components-section">
    <div class="grid" data-cols="2">
        {@render color()}
    </div>
</section>

<style>
    .lz-section#components-section {
        gap: var(--lz-spacing-space700) !important;

        & section.nested header .headline {
            font-size: var(--lz-typescale-headline-l-font-size);
            letter-spacing: var(--lz-typescale-headline-l-font-tracking);
            font-weight: var(--lz-typescale-headline-l-font-weight);
            font-variation-settings: var(--lz-typescale-headline-l-font-wght);
        }

        & section.nested {
            & .grid {
                width: 100%;
                display: grid;
                gap: var(--lz-spacing-space100);

                &[data-cols="1"] {
                    grid-template-columns: 1fr;
                }

                &[data-cols="2"] {
                    grid-template-columns: repeat(2, 1fr);
                }

                &[data-cols="3"] {
                    grid-template-columns: repeat(3, 1fr);
                }
            }

            & :global(.lz-card) {
                & .headline {
                    font-size: var(--lz-typescale-title-l-font-size);
                    letter-spacing: var(--lz-typescale-title-l-font-tracking);
                    font-weight: var(--lz-typescale-title-l-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-title-l-font-wght
                    );
                }
                & .supporting-text {
                    font-size: var(--lz-typescale-body-m-font-size);
                    letter-spacing: var(--lz-typescale-body-m-font-tracking);
                    font-weight: var(--lz-typescale-body-m-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-body-m-font-wght
                    );
                }
            }
        }
    }
</style>
