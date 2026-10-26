<script lang="ts" module>
    export const title = "Buttons";
</script>

<script lang="ts">
    import { LzButton } from "#lib";

    import ToggleOffIcon from "~icons/material-symbols/edit-outline-sharp";
    import ToggleOnIcon from "~icons/material-symbols/edit-sharp";

    import LeadingIcon from "~icons/material-symbols/android-sharp";
    import TrailingIcon from "~icons/material-symbols/open-in-new-outline-sharp";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">Buttons</h1>
            <a
                href="https://m3.material.io/components/buttons/overview"
                target="_blank"
                rel="noopener noreferrer"
                >Docs
            </a>
        </hgroup>
    </header>
</section>

{#snippet variants()}
    <ul>
        <li>
            <header class="lz-container-header">
                <hgroup>
                    <h4 class="headline">Default button</h4>
                </hgroup>
            </header>
            <LzButton size="medium" iconLeading={ToggleOnIcon}>Label</LzButton>
        </li>

        <li>
            <header class="lz-container-header">
                <hgroup>
                    <h4 class="headline">Toggle button</h4>
                </hgroup>
            </header>
            <LzButton
                size="medium"
                variant="toggle"
                iconLeading={ToggleOffIcon}
                iconToggled={ToggleOnIcon}>Label</LzButton
            >
        </li>
    </ul>
{/snippet}

<section class="lz-section primary" id="button-variants">
    <header class="lz-section-header">
        <hgroup>
            <h3 class="headline">Variants</h3>
        </hgroup>
    </header>
    {@render variants()}
</section>

{#snippet configurations()}
    <ul>
        <li>
            <header>
                <hgroup>
                    <h4 class="headline">Size</h4>
                </hgroup>
            </header>
            <ul id="btn-sizes">
                <li>
                    <LzButton size="x-small" color="tonal">Extra small</LzButton
                    >
                </li>
                <li>
                    <LzButton size="small" color="tonal">Small</LzButton>
                </li>
                <li>
                    <LzButton size="medium" color="tonal">Medium</LzButton>
                </li>
                <li>
                    <LzButton size="large" color="outlined">Large</LzButton>
                </li>
                <li>
                    <LzButton size="x-large" color="outlined"
                        >Extra large</LzButton
                    >
                </li>
            </ul>
        </li>
        <li>
            <header>
                <hgroup>
                    <h4 class="headline">Shape</h4>
                </hgroup>
            </header>
            <ul id="btn-shapes">
                <li>
                    <LzButton size="medium" color="outlined">Round</LzButton>
                </li>
                <li>
                    <LzButton size="medium" color="outlined" shape="square"
                        >Square</LzButton
                    >
                </li>
            </ul>
        </li>

        <li>
            <header>
                <hgroup>
                    <h4 class="headline">Color</h4>
                </hgroup>
            </header>
            <ul id="btn-colors">
                <li>
                    <LzButton size="medium" color="elevated">Elevated</LzButton>
                </li>
                <li>
                    <LzButton size="medium" color="filled">Filled</LzButton>
                </li>

                <li>
                    <LzButton size="medium" color="tonal">Tonal</LzButton>
                </li>
                <li>
                    <LzButton size="medium" color="outlined">Outlined</LzButton>
                </li>
                <li>
                    <LzButton size="medium" color="text">Text</LzButton>
                </li>
            </ul>
        </li>
    </ul>
{/snippet}

<section class="lz-section primary" id="button-configs">
    <header class="lz-section-header">
        <hgroup>
            <h3 class="headline">Configurations</h3>
        </hgroup>
    </header>
    {@render configurations()}
</section>

{#snippet extras()}
    <ul>
        <li>
            <header>
                <hgroup>
                    <h4 class="headline">Trailing icon</h4>
                </hgroup>
            </header>
            <ul id="btn-icon-trailing">
                <li>
                    <header>
                        <hgroup>
                            <h5 class="headline">Trailing icon only:</h5>
                        </hgroup>
                    </header>
                    <LzButton size="medium" iconTrailing={TrailingIcon}
                        >Label</LzButton
                    >
                </li>

                <li>
                    <header>
                        <hgroup>
                            <h5 class="headline">Leading and trailing:</h5>
                        </hgroup>
                    </header>
                    <LzButton
                        size="medium"
                        iconLeading={LeadingIcon}
                        iconTrailing={TrailingIcon}>Label</LzButton
                    >
                </li>
                <li>
                    <small>Only the leading icon reacts to toggle states.</small
                    >
                </li>
            </ul>
        </li>
    </ul>
{/snippet}

<section class="lz-section primary" id="button-extras">
    <header class="lz-section-header">
        <hgroup>
            <h3 class="headline">Extras</h3>
        </hgroup>
    </header>
    {@render extras()}
</section>

<style>
    #button-variants,
    #button-configs,
    #button-extras {
        & ul {
            display: flex;
            padding: var(--lz-spacing-space200);
            gap: var(--lz-spacing-space400);
        }

        & h4.headline {
            font-size: var(--lz-typescale-title-l-font-size);
            letter-spacing: var(--lz-typescale-title-l-font-tracking);
            font-weight: var(--lz-typescale-title-l-font-weight);
            font-variation-settings: var(--lz-typescale-title-l-font-wght);
        }

        & h5.headline {
            font-size: var(--lz-typescale-label-m-font-size);
            letter-spacing: var(--lz-typescale-label-m-font-tracking);
            font-weight: var(--lz-typescale-label-m-font-weight);
            font-variation-settings: var(--lz-typescale-label-m-font-wght);
        }

        & small {
            font-size: var(--lz-typescale-body-s-font-size);
            letter-spacing: var(--lz-typescale-body-s-font-tracking);
            font-weight: var(--lz-typescale-body-s-font-weight);
            font-variation-settings: var(--lz-typescale-body-s-font-wght);
            color: var(--lz-color-on-surface-variant);
        }
    }

    #button-variants ul {
        flex-direction: row;
        justify-content: start;

        & li {
            display: flex;
            flex-direction: column;
            gap: var(--lz-spacing-space200);
        }
    }

    #button-configs,
    #button-extras {
        & > ul {
            display: flex;
            flex-direction: column;

            & li {
                display: flex;
                flex-direction: column;

                & #btn-sizes {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: var(--lz-spacing-space200);
                }
            }
        }
    }

    #button-extras #btn-icon-trailing {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr 1fr;

        & li {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--lz-spacing-space200);
            grid-row: 1;

            &:last-of-type {
                grid-row: 2;
            }
        }
    }
</style>
