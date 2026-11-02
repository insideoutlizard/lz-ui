<script lang="ts" module>
    import type { LzPageMeta } from "#lib/components/navigation/types.ts";

    export const meta: LzPageMeta = {
        label: "App bars",
    };
</script>

<script lang="ts">
    import { LzButton, LzCard, LzAppBar } from "#lib";
    import MenuIcon from "~icons/material-symbols/menu-sharp";
    import ArrowBackIcon from "~icons/material-symbols/arrow-back-sharp";
    import MicIcon from "~icons/material-symbols/mic-sharp";
    import SearchIcon from "~icons/material-symbols/search-outline-sharp";
    import EventIcon from "~icons/material-symbols/event-outline-sharp";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">{meta.label}</h1>
            <a
                href="https://m3.material.io/components/app-bars/specs"
                target="_blank"
                rel="noopener noreferrer"
                >Docs
            </a>
        </hgroup>
    </header>
</section>

{#snippet variants()}
    <LzCard className="app-bar-container">
        <ul class="grid">
            <li>
                <header>
                    <h3 class="headline">Search</h3>
                </header>
                <LzAppBar variant="search">
                    <div class="action-wrapper">
                        <LzButton color="text" iconLeading={MenuIcon} />
                    </div>
                    <LzButton
                        color="tonal"
                        size="medium"
                        iconTrailing={MicIcon}
                        className="fake-search"
                        overrides={["full-width"]}>Search product</LzButton
                    >
                    <div class="action-wrapper">
                        <LzButton color="filled">A</LzButton>
                    </div>
                </LzAppBar>
            </li>
            <li>
                <header>
                    <h3 class="headline">Small</h3>
                </header>
                <LzAppBar variant="small">
                    <div class="action-wrapper">
                        <LzButton color="text" iconLeading={ArrowBackIcon} />
                    </div>
                    <span class="headline small">Title Large</span>

                    <div class="action-wrapper">
                        <LzButton color="text" iconLeading={SearchIcon} />
                    </div>
                    <div class="action-wrapper">
                        <LzButton color="text" iconLeading={EventIcon} />
                    </div>
                </LzAppBar>
            </li>
            <li>
                <header>
                    <h3 class="headline">Medium flexible</h3>
                </header>
                <LzAppBar variant="medium-flexible">
                    <div class="leading-button">
                        <div class="action-wrapper">
                            <LzButton
                                color="text"
                                iconLeading={ArrowBackIcon}
                            />
                        </div>
                    </div>
                    <div class="trailing-icons">
                        <div class="action-wrapper">
                            <LzButton color="text" iconLeading={SearchIcon} />
                        </div>
                        <div class="action-wrapper">
                            <LzButton color="text" iconLeading={EventIcon} />
                        </div>
                    </div>

                    <span class="headline medium">Headline Medium</span>
                </LzAppBar>
            </li>
            <li>
                <header>
                    <h3 class="headline">Large flexible</h3>
                </header>
                <LzAppBar variant="large-flexible">
                    <div class="leading-button">
                        <div class="action-wrapper">
                            <LzButton
                                color="text"
                                iconLeading={ArrowBackIcon}
                            />
                        </div>
                    </div>
                    <div class="trailing-icons">
                        <div class="action-wrapper">
                            <LzButton color="text" iconLeading={SearchIcon} />
                        </div>
                        <div class="action-wrapper">
                            <LzButton color="text" iconLeading={EventIcon} />
                        </div>
                    </div>

                    <span class="headline large">Display Small</span>
                </LzAppBar>
            </li>
        </ul>
    </LzCard>
{/snippet}

<section class="lz-section primary" id="app-bar-variants">
    <header class="lz-section-header">
        <hgroup>
            <h3 class="headline">Variants</h3>
        </hgroup>
    </header>
    {@render variants()}
</section>

<style>
    :global(.app-bar-container .lz-card-inner) {
        & .grid {
            display: flex;
            flex-direction: column;
            gap: var(--lz-spacing-space300) !important;

            & li {
                display: flex;
                flex-direction: column;
                gap: var(--lz-spacing-space200) !important;
            }
            & h3.headline {
                font-family: var(--lz-typography-typeface-plain);
                font-size: var(--lz-typescale-label-m-font-size);
                line-height: var(--lz-typescale-label-m-line-height);
                letter-spacing: var(--lz-typescale-label-m-font-tracking);
                font-weight: var(--lz-typescale-label-m-font-weight);
                font-variation-settings: var(--lz-typescale-label-m-font-wght);
            }
        }

        & :global(.lz-app-bar) {
            position: static;
            z-index: 1;
            width: 100%;

            &:global([data-variant="search"] .inner .fake-search) {
                --lz-button-surface-tonal-bg: var(
                    --lz-color-surface-container-high
                );
                --lz-button-surface-tonal-fg: var(
                    --lz-color-on-surface-variant
                );
            }

            & .action-wrapper {
                width: 3rem;
                height: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            & span.headline {
                color: var(--lz-color-on-surface);
                width: 100%;
                flex: 1;

                &.small {
                    font-family: var(--lz-typography-typeface-brand);
                    font-size: var(--lz-typescale-title-l-font-size);
                    line-height: var(--lz-typescale-title-l-line-height);
                    letter-spacing: var(--lz-typescale-title-l-font-tracking);
                    font-weight: var(--lz-typescale-title-l-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-title-l-font-wght
                    );
                }

                &.medium {
                    font-family: var(--lz-typography-typeface-brand);
                    font-size: var(--lz-typescale-headline-m-font-size);
                    line-height: var(--lz-typescale-headline-m-line-height);
                    letter-spacing: var(
                        --lz-typescale-headline-m-font-tracking
                    );
                    font-weight: var(--lz-typescale-headline-m-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-headline-m-font-wght
                    );
                    padding-inline-start: var(--lz-spacing-space200);
                }

                &.large {
                    font-family: var(--lz-typography-typeface-brand);
                    font-size: var(--lz-typescale-display-s-font-size);
                    line-height: var(--lz-typescale-display-s-line-height);
                    letter-spacing: var(--lz-typescale-display-s-font-tracking);
                    font-weight: var(--lz-typescale-display-s-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-display-s-font-wght
                    );
                    padding-inline-start: var(--lz-spacing-space200);
                }
            }

            &:global([data-variant*="medium"]),
            &:global([data-variant*="large"]) {
                padding-block: var(--lz-spacing-space100);

                & :global(.inner) {
                    justify-content: space-between;

                    & .leading-button,
                    & .trailing-icons {
                        display: flex;
                        width: fit-content;
                        grid-row: 1;
                    }

                    & .trailing-icons {
                        display: flex;
                    }

                    & .headline {
                        grid-row: 2;
                    }
                }
            }
        }
    }
</style>
