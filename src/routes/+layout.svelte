<script lang="ts">
    import "./resets.css";
    import "./layout.css";
    import "./color.css";

    import "#lib/styles/index.css";
    import { page } from "$app/state";
    import { fly, fade } from "svelte/transition";
    import { cubicIn, cubicOut } from "svelte/easing";

    import BugIcon from "~icons/material-symbols/bug-report-outline-sharp";
    import BugIconFill from "~icons/material-symbols/bug-report-sharp";

    import { LzButton, LzNavigationRail, type LzNavItem } from "#lib";

    const pages = import.meta.glob("/src/routes/**/+page.svelte", {
        eager: true,
    });

    const navItems: LzNavItem[] = Object.entries(pages)
        .map(([filePath, module]: [string, any]) => {
            let path = filePath
                .replace("/src/routes", "")
                .replace("/+page.svelte", "");
            if (path === "") path = "/";

            // Use exported title, or fallback to file name
            const label =
                module.label ||
                path.split("/").pop()?.replace(/-/g, " ") ||
                "Home";
            const icon = module.icon ?? BugIcon;
            const activeIcon = module.activeIcon ?? BugIconFill;
            const order = module.order ?? 99; // Manual sorting priority
            const current = page.url.pathname === path;

            return { path, label, icon, activeIcon, order, current };
        })
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);

    let isMobileSize = $state(false);

    $effect(() => {
        const mediaQuery = window.matchMedia("(width <= 768px)");
        isMobileSize = mediaQuery.matches;

        const handleResize = (e: MediaQueryListEvent) => {
            isMobileSize = e.matches;
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    });
</script>

{#if !isMobileSize}
    <LzNavigationRail menuItems={navItems} ariaLabel="Primary links" />
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
        --lz-content-space-top: 3.5rem;
        --lz-content-space-left: 0;
    }

    @media (width > 768px) {
        :root {
            --lz-max-content-width: 1024px;
            --lz-content-space-top: 0;
            --lz-content-space-left: var(--lz-navigation-rail-width);
        }
    }

    #content {
        margin-top: var(--lz-content-space-top);
        margin-left: var(--lz-content-space-left);
        box-sizing: border-box;
        width: calc(100% - var(--lz-content-space-left));
    }
</style>
