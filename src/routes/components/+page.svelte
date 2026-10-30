<script lang="ts" module>
    import type { LzPageMeta } from "#lib";
    import PageIcon from "~icons/material-symbols/component-exchange-sharp";

    export const meta: LzPageMeta = {
        label: "Components",
        icon: PageIcon,
        activeIcon: PageIcon,
    };
</script>

<script lang="ts">
    import { LzButton, LzCard } from "#lib";
    import type { LzButtonColor } from "#lib";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">Components</h1>
            <a
                href="https://m3.material.io/components"
                target="_blank"
                rel="noopener noreferrer">Docs</a
            >
        </hgroup>
    </header>
</section>

{#snippet buttons()}
    <section class="nested">
        <header>
            <h2 class="headline">Buttons</h2>
        </header>

        <div class="grid" data-cols="2">
            <LzCard variant="filled" href="/components/button-groups">
                <header>
                    <h3 class="headline">Button groups</h3>
                </header>

                <p class="supporting-text">
                    Button groups are clustered, related buttons that offer a
                    choice among options.
                </p>
            </LzCard>

            <LzCard variant="filled" href="/components/buttons">
                <header>
                    <h3 class="headline">Buttons</h3>
                </header>

                <p class="supporting-text">
                    Floating action buttons (FABs) are floating buttons that
                    trigger the primary action on a screen.
                </p>
            </LzCard>

            <LzCard variant="filled" href="/components/floating-action-button">
                <header>
                    <h3 class="headline">Floating action buttons (FABs)</h3>
                </header>

                <p class="supporting-text">
                    Buttons are clickable triggers that launch specific actions.
                </p>
            </LzCard>
        </div>
    </section>
{/snippet}

{#snippet nav()}
    <section class="nested"></section>
{/snippet}

{#snippet allComps()}
    <section class="nested">
        <header>
            <h2 class="headline">All other components</h2>
        </header>

        <div class="grid" data-cols="2">
            <LzCard variant="filled" href="/components/buttons">
                <header>
                    <h3 class="headline">Cards</h3>
                </header>

                <p class="supporting-text">
                    Cards are structured content containers that group related
                    details about a single topic.
                </p>
            </LzCard>
        </div>
    </section>
{/snippet}

<section class="lz-section primary" id="components-section">
    {@render buttons()}
    {@render nav()}
    {@render allComps()}
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
