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
        type LzNavItem,
        LzIcon,
        LzList,
    } from "#lib";

    import { navItems } from "#lib/Navigation.svelte";
    import { label } from "./components/floating-action-button/+page.svelte";

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);

    let isMobileSize = $state(false);
    let isDrawerAllowed = $state(false);

    let activeParent = $derived.by(() => {
        if (currentPath === "/") return null;
        return navItems.find(
            (item) =>
                item.path !== "/" &&
                currentPath.startsWith(item.path) &&
                (item.children?.length ?? 0) > 0,
        );
    });

    let isDrawerOpen = $derived(
        !!activeParent &&
            !!activeParent.children &&
            activeParent.children.length > 0 &&
            isDrawerAllowed,
    );

    // let drawerItems = $derived(activeParent?.children ?? []);

    $effect(() => {
        const mobile = window.matchMedia("(width <= 768px)");
        const drawer = window.matchMedia("(width <= 960px)");

        isMobileSize = mobile.matches;
        isDrawerAllowed = drawer.matches;

        const handleResize = (e: MediaQueryListEvent) => {
            isMobileSize = e.matches;
        };

        mobile.addEventListener("change", handleResize);
        drawer.addEventListener("change", handleResize);

        return () => {
            mobile.removeEventListener("change", handleResize);
            drawer.removeEventListener("change", handleResize);
        };
    });
</script>

{#snippet themeSwitcher()}
    <LzThemeSwitcher />
{/snippet}

{#snippet drawerLinks()}
    <nav class="drawer-nav">
        <ul class="drawer-links">
            <li>
                <LzButton
                    color={currentPath === "/components" ? "tonal" : "text"}
                    href="/components">Components</LzButton
                >
            </li>
            <li>
                <LzList
                    leadingLabel="Buttons"
                    items={[
                        ["/components/all-buttons", "All buttons"],
                        ["/components/buttons", "Buttons"],
                        ["/components/button-groups", "Button groups"],
                        ["/components/floating-action-button", "FABs"],
                    ]}
                ></LzList>
            </li>
            <li>
                <LzButton
                    color={currentPath === "/components/cards"
                        ? "tonal"
                        : "text"}
                    href="/components/cards">Cards</LzButton
                >
            </li>
        </ul>
    </nav>
{/snippet}

{#if !isMobileSize}
    <LzNavigationRail menuItems={navItems} ariaLabel="Primary links">
        <footer class="rail-actions">
            {@render themeSwitcher()}
        </footer>
    </LzNavigationRail>
    <LzNavigationDrawer
        variant="modal"
        density="desktop"
        drawerItems={drawerLinks}
        bind:isOpen={isDrawerOpen}
        leftOffset
        compact
    />
{/if}

{#key currentPath}
    <main
        id="content"
        in:fly={{ y: 12, duration: 200, delay: 75, easing: cubicOut }}
        out:fade={{ duration: 75, easing: cubicIn }}
    >
        {@render children()}
    </main>
{/key}

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
        --lz-max-content-width: 100%;
        --lz-gutter: var(--lz-spacing-space300);
        /*--lz-content-space-top: var(--lz-app-bar-height);*/

        --lz-content-space-left: 0;
    }

    @media (width > 768px) {
        :root {
            --lz-max-content-width: 1024px;
            --lz-content-space-top: 0;
            --lz-content-space-left: var(--lz-navigation-rail-width);
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

    :global(.lz-navigation-rail .inner .rail-actions) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: auto;
        width: 100%;
        gap: var(--lz-spacing-space100);
        margin-bottom: var(--lz-spacing-space200);
    }
</style>
