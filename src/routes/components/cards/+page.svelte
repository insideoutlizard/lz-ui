<script lang="ts" module>
    export const label = "Cards";
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
            <h1 class="headline">Cards</h1>
            <a
                href="https://m3.material.io/components/cards/specs"
                target="_blank"
                rel="noopener noreferrer"
                >Docs
            </a>
        </hgroup>
    </header>
</section>

{#snippet variants()}
    <ul class="card-grid">
        <li>
            <LzCard variant="elevated">
                <header>
                    <hgroup>
                        <h3 class="headline">Elevated card</h3>
                    </hgroup>
                </header>
            </LzCard>
        </li>
        <li>
            <LzCard variant="filled">
                <header>
                    <hgroup>
                        <h3 class="headline">Filled card</h3>
                    </hgroup>
                </header>
            </LzCard>
        </li>
        <li>
            <LzCard variant="outlined">
                <header>
                    <hgroup>
                        <h3 class="headline">Outlined card</h3>
                    </hgroup>
                </header>
            </LzCard>
        </li>

        <li>
            <LzCard
                variant="outlined"
                href="https://google.ca/"
                target="_blank"
                rel="noopenner noreferrer"
            >
                <header>
                    <hgroup>
                        <h3 class="headline">Outlined card</h3>
                    </hgroup>
                </header>
            </LzCard>
        </li>
    </ul>
{/snippet}

<section class="lz-section primary" id="card-variants">
    <header class="lz-section-header">
        <hgroup>
            <h3 class="headline">Variants</h3>
            <p>Ordered by visual emphasis.</p>
        </hgroup>
    </header>
    {@render variants()}
</section>

{#snippet config()}
    <ul class="card-row">
        <li>
            <header>
                <hgroup>
                    <h3 class="headline">Standard</h3>
                </hgroup>
            </header>
            <LzCard variant="elevated" isDefault id="standard-card">
                <figure class="card-media">
                    <img
                        src="/cards/davidrockdesign-triangles-1430105.svg"
                        alt="Abstract rainbow triangles"
                    />
                </figure>

                <div class="content">
                    <header class="card-heading">
                        <hgroup>
                            <h4 class="headline">Headline</h4>
                            <p class="subhead">Subhead</p>
                        </hgroup>
                        <p class="supporting-text">Supporting text</p>
                    </header>

                    <footer class="card-actions">
                        <LzButton color="outlined">Action</LzButton>
                        <LzButton color="filled">Action</LzButton>
                    </footer>
                </div>
            </LzCard>
        </li>
    </ul>
{/snippet}

<section class="lz-section primary" id="card-variants">
    <header class="lz-section-header">
        <hgroup>
            <h2 class="headline">Configurations</h2>
        </hgroup>
    </header>
    {@render config()}
</section>

<style>
    .card-grid {
        display: flex;
        width: 100%;
        min-width: var(--lz-max-content-width);
        gap: var(--lz-spacing-space400);
        box-sizing: border-box;

        & li {
            width: 100%;
            min-height: var(--lz-spacing-space900);
            & :global(.lz-card) {
                height: 100%;
            }
        }

        & h3 {
            font-size: var(--lz-typescale-label-m-font-size);
            letter-spacing: var(--lz-typescale-label-m-font-tracking);
            font-weight: var(--lz-typescale-label-m-font-weight);
            font-variation-settings: var(--lz-typescale-label-m-font-wght);
        }
    }

    :global(#standard-card) {
        max-width: 20rem;

        & :global(.card-media) {
            overflow: hidden;
            border-radius: var(--lz-card-corner-shape);

            & img {
                display: block;
                width: 100%;
                max-width: 20rem;
                object-fit: cover;
                height: 100%;
            }
        }

        & .content {
            display: flex;
            flex-direction: column;
            padding: var(--lz-spacing-space200);
            gap: var(--lz-spacing-space200);
            & .card-heading {
                display: flex;
                flex-direction: column;
                gap: var(--lz-spacing-space200);

                & hgroup {
                    display: flex;
                    flex-direction: column;
                    gap: var(--lz-spacing-space50);
                }

                & .headline {
                    font-size: var(--lz-typescale-title-l-font-size);
                    letter-spacing: var(--lz-typescale-title-l-font-tracking);
                    font-weight: var(--lz-typescale-title-l-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-title-l-font-wght
                    );
                }

                & .subhead {
                    font-size: var(--lz-typescale-title-s-font-size);
                    letter-spacing: var(--lz-typescale-title-s-font-tracking);
                    font-weight: var(--lz-typescale-title-s-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-title-s-font-wght
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

            & .card-actions {
                display: flex;
                flex-direction: row;
                justify-content: end;
                gap: var(--lz-spacing-space100);
            }
        }
    }
</style>
