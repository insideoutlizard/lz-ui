<script lang="ts" module>
    import type { LzPageMeta } from "#lib";
    import PageIcon from "~icons/material-symbols/home-outline-sharp";
    import ActivePageIcon from "~icons/material-symbols/home-sharp";

    export const meta: LzPageMeta = {
        label: "Home",
        icon: PageIcon,
        activeIcon: ActivePageIcon,
    };
</script>

<script lang="ts">
    import { LzButton } from "#lib";
    import type { LzButtonColor } from "#lib";
</script>

<section class="lz-hero primary">
    <header class="lz-page-header">
        <hgroup>
            <h1 class="headline">lz-ui</h1>
            <p class="subhead">Svelte 5 component library.</p>
        </hgroup>

        <p class="supporting-text">
            Attempts to follow the official <a
                href="https://m3.material.io/"
                target="_blank"
                rel="noopener noreferrer"
                >Material 3 docs
            </a>
            with improvements for traditional desktop websites.
        </p>
        <p class="supporting-text">
            This project also implements Material 3
            <a
                href="https://m3.material.io/foundations/design-tokens/overview"
                target="_blank"
                rel="noopener noreferrer">design tokens</a
            > as CSS variables.
        </p>
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
        <a class="index-quick-link" href="/styles">
            <header>
                <hgroup>
                    <h3>Styles</h3>
                </hgroup>
            </header>
        </a>
    </section>
</section>

<style>
</style>
