<script lang="ts" module>
    export const title = "Cards";
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
</style>
