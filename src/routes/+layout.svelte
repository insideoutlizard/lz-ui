<script lang="ts">
    import "./resets.css";
    import "./layout.css";
    import "./color.css";

    import "#lib/styles/index.css";

    import { page } from "$app/state";
    import { fly, fade } from "svelte/transition";
    import { cubicIn, cubicOut } from "svelte/easing";

    import {
        LzButton,
        LzNavigationRail,
        LzNavigationDrawer,
        LzThemeSwitcher,
        LzList,
    } from "#lib";
    import { LzNavigationConfig } from "#lib";

    let { children } = $props();
    let navContainer: HTMLDivElement | undefined = $state();
    let currentPath = $derived(page.url.pathname);
</script>

<LzNavigationConfig>
    {#key currentPath}
        <main
            id="content"
            in:fly={{ y: 12, duration: 200, delay: 75, easing: cubicOut }}
            out:fade={{ duration: 75, easing: cubicIn }}
        >
            {@render children()}
        </main>
    {/key}
</LzNavigationConfig>

<style>
    :root {
        --lz-typeface-brand: Roboto;
        --lz-typeface-plain: Roboto;
        color-scheme: light dark;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        scrollbar-color: var(--lz-color-surface-variant) transparent;
        scrollbar-width: thin;

        --lz-density-global: var(--lz-spacing-density-1);
        --lz-gutter: var(--lz-spacing-space300);

        --lz-content-space-left: 0;
    }

    @media (width < 600px) {
        :root {
            --lz-max-content-width: 100%;
            --lz-content-space-top: var(--lz-app-bar-small-height);
        }
    }

    @media (width >= 600px) and (width < 840px) {
        :root {
            --lz-max-content-width: 100%;
            --lz-content-space-top: var(--lz-app-bar-small-height);
            --lz-content-space-left: 0;
        }
    }

    @media (width >= 840px) and (width < 1200px) {
        :root {
            --lz-max-content-width: 100%;
            --lz-content-space-top: 0;
            --lz-content-space-left: var(--lz-navigation-rail-width-expanded);
        }
    }

    @media (width >= 1200px) and (width < 1600px) {
        :root {
            --lz-max-content-width: 1024px;
            --lz-content-space-top: 0;
            --lz-content-space-left: var(--lz-navigation-rail-width-expanded);
        }
    }

    @media (width >= 1600px) {
        :root {
            --lz-max-content-width: 1024px;
            --lz-content-space-top: 0;
            --lz-content-space-left: var(--lz-navigation-rail-width-expanded);
        }
    }

    :global(.no-scroll) {
        overflow: hidden;
    }

    :global(.no-select) {
        user-select: none;
    }

    #content {
        margin-top: var(--lz-content-space-top);
        margin-left: var(--lz-content-space-left);
        box-sizing: border-box;
        width: calc(100% - var(--lz-content-space-left));
    }

    :global(.lz-navigation-rail) {
        --lz-navigation-rail-border-right: 1px solid
            oklch(from var(--lz-color-outline-variant) l c h / 0.16);

        & :global(.inner .rail-actions) {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: auto;
            width: 100%;
            gap: var(--lz-spacing-space100);
            margin-bottom: var(--lz-spacing-space200);
        }
    }

    .drawer-links {
        display: flex;
        flex-direction: column;
        gap: var(--lz-spacing-space25);
    }

    :global(.drawer-header .surface .label) {
        color: var(--lz-coplor-on-surface-variant);
        font-size: var(--lz-typescale-label-m-font-size);
        letter-spacing: var(--lz-typescale-label-m-font-tracking);
        font-weight: var(--lz-typescale-label-m-font-weight);
        font-variation-settings: var(--lz-typescale-label-m-font-wght);
    }
</style>
