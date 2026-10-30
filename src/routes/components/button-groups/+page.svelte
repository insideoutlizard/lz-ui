<script lang="ts" module>
    export const label = "Button groups";
</script>

<script lang="ts">
    import { LzButton, LzCard } from "#lib";

    import ToggleOffIcon from "~icons/material-symbols/edit-outline-sharp";
    import ToggleOnIcon from "~icons/material-symbols/edit-sharp";

    import LeadingIcon from "~icons/material-symbols/android-sharp";
    import TrailingIcon from "~icons/material-symbols/open-in-new-outline-sharp";
</script>

<section class="lz-hero secondary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">All buttons</h1>
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
    <LzCard variant="outlined">
        <ul class="vert-list gap-med">
            <li>
                <header class="lz-container-header">
                    <h3 class="headline">Default button</h3>
                </header>
                <LzButton size="medium" iconLeading={ToggleOnIcon}
                    >Label</LzButton
                >
            </li>

            <li>
                <header class="lz-container-header">
                    <hgroup>
                        <h3 class="headline">Toggle button</h3>
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
    </LzCard>
{/snippet}

<section class="lz-section primary" id="button-variants">
    <header class="lz-section-header">
        <h2 class="headline">Variants</h2>
    </header>

    {@render variants()}
</section>

{#snippet configurations()}
    <article class="carticle">
        <header>
            <h3 class="headline" id="h-btn-sizes">Size</h3>
        </header>
        <LzCard variant="outlined">
            <ul id="btn-sizes" aria-labelledby="h-btn-sizes">
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
                    <LzButton size="large" color="tonal">Large</LzButton>
                </li>
                <li>
                    <LzButton size="x-large" color="tonal">Extra large</LzButton
                    >
                </li>
            </ul>
        </LzCard>
    </article>

    <article class="carticle">
        <header>
            <h3 class="headline" id="h-btn-shape">Shape</h3>
        </header>

        <LzCard variant="outlined">
            <ul id="btn-shapes" aria-labelledby="h-btn-shape">
                <li>
                    <LzButton size="medium" color="outlined">Round</LzButton>
                </li>
                <li>
                    <LzButton size="medium" color="outlined" shape="square"
                        >Square</LzButton
                    >
                </li>
            </ul>
        </LzCard>
    </article>

    <article class="carticle">
        <header>
            <h3 class="headline" id="h-btn-color">Color</h3>
        </header>

        <LzCard variant="outlined">
            <ul id="btn-colors" aria-labelledby="h-btn-color">
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
        </LzCard>
    </article>
{/snippet}

<section class="lz-section primary" id="button-configs">
    <header class="lz-section-header">
        <hgroup>
            <h2 class="headline">Configurations</h2>
        </hgroup>
    </header>
    {@render configurations()}
</section>

{#snippet extras()}
    <article class="carticle">
        <header>
            <hgroup>
                <h3 class="headline">Trailing icon</h3>
            </hgroup>
        </header>

        <LzCard variant="outlined">
            <ul id="btn-icon-trailing">
                <li>
                    <header>
                        <hgroup>
                            <h4 class="headline">Trailing icon only:</h4>
                        </hgroup>
                    </header>
                    <LzButton size="medium" iconTrailing={TrailingIcon}
                        >Label</LzButton
                    >
                </li>

                <li>
                    <header>
                        <hgroup>
                            <h4 class="headline">Leading and trailing:</h4>
                        </hgroup>
                    </header>
                    <LzButton
                        size="medium"
                        iconLeading={LeadingIcon}
                        iconTrailing={TrailingIcon}>Label</LzButton
                    >
                </li>
            </ul>
        </LzCard>
        <small class="sidenote"
            >Only the leading icon reacts to toggle states.</small
        >
    </article>
{/snippet}

<section class="lz-section primary" id="button-extras">
    <header class="lz-section-header">
        <hgroup>
            <h2 class="headline">Extras</h2>
        </hgroup>
    </header>
    {@render extras()}
</section>

<style>
    .lz-container-header {
        font-size: var(--lz-typescale-label-m-font-size);
        letter-spacing: var(--lz-typescale-label-m-font-tracking);
        font-weight: var(--lz-typescale-label-m-font-weight);
        font-variation-settings: var(--lz-typescale-label-m-font-wght);
    }

    article.carticle {
        display: flex;
        flex-direction: column;
        gap: var(--lz-spacing-space200);

        & .headline {
            font-size: var(--lz-typescale-title-l-font-size);
            letter-spacing: var(--lz-typescale-title-l-font-tracking);
            font-weight: var(--lz-typescale-headline-l-font-weight);
            font-variation-settings: var(--lz-typescale-title-l-font-wght);
        }

        ul li {
            padding: var(--lz-spacing-space200) var(--lz-spacing-space100);
        }
    }

    .vert-list {
        padding: var(--lz-spacing-space200) var(--lz-spacing-space100);
    }

    :global(.lz-card) {
        & ul {
            overflow-x: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--lz-spacing-space200);

            & li {
                display: flex;
                flex-direction: column;
                gap: var(--lz-spacing-space200);
            }
        }
    }

    #btn-colors {
        padding: var(--lz-spacing-space100) var(--lz-spacing-space25);
    }

    .sidenote {
        margin-left: var(--lz-spacing-space100);
        margin-top: calc(var(--lz-spacing-space100) * -1);
    }
</style>
