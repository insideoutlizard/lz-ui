<script lang="ts" module>
    import type { Snippet } from "svelte";
    import type {
        LzPage,
        LzPageMeta,
    } from "#lib/components/navigation/types.ts";

    const pagesRaw = import.meta.glob("#routes/**/+page.svelte", {
        eager: true,
    });

    export const pagesFlat: LzPage[] = Object.entries(pagesRaw)
        .map(([filePath, module]: [string, any]) => {
            let path = filePath
                .replace(/^.*\/routes/, "")
                .replace(/\([^)]*\)\//g, "")
                .replace("/+page.svelte", "");

            if (path === "") path = "/";

            const groups =
                filePath.match(/\(([^)]+)\)/g)?.map((group) => {
                    const name = group.slice(1, -1);
                    return name.charAt(0).toUpperCase() + name.slice(1);
                }) ?? [];

            const meta: LzPageMeta = module.meta ?? {
                label: path.split("/").pop()?.replace(/-/g, " ") ?? "Index",
            };

            return {
                path,
                groups,
                label: meta.label,
                icon: meta.icon,
                activeIcon: meta.activeIcon,
            };
        })
        .sort((a, b) => {
            if (a.path === "/") return -1;
            if (b.path === "/") return 1;

            if (a.path.endsWith("-overview")) return -1;
            if (b.path.endsWith("-overview")) return 1;

            return a.label.localeCompare(b.label);
        });
</script>

<script lang="ts">
    import {
        LzButton,
        LzNavigationRail,
        LzNavigationDrawer,
        LzAppBar,
        type LzButtonSize,
    } from "#lib/components/index.ts";
    import { LzThemeSwitcher } from "#lib/util/index.ts";

    import MenuIcon from "~icons/material-symbols/menu-sharp";
    import MenuOpenIcon from "~icons/material-symbols/menu-open-sharp";

    let { children } = $props();

    let isMobileSize = $state(false);
    let isMobileDrawerOpen = $state(false);

    $effect(() => {
        const mobile = window.matchMedia("(width < 840px)");
        isMobileSize = mobile.matches;

        const handleMobile = (e: MediaQueryListEvent) => {
            isMobileSize = e.matches;
        };
        mobile.addEventListener("change", handleMobile);
        return () => {
            mobile.removeEventListener("change", handleMobile);
        };
    });

    import { onNavigate } from "$app/navigation";

    onNavigate(() => {
        if (!isMobileDrawerOpen) return;

        isMobileDrawerOpen = false;
        return new Promise((resolve) => setTimeout(resolve, 225));
    });
</script>

{#snippet railActions()}
    <LzThemeSwitcher defaultLabel />
{/snippet}

{#if !isMobileSize}
    <LzNavigationRail
        actionButton={railActions}
        ariaLabel="Sidebar"
        primaryItems={pagesFlat}
        expanded
    >
        <footer class="rail-actions">
            {@render railActions()}
        </footer>
    </LzNavigationRail>
{:else}
    <LzAppBar>
        <LzButton
            id="mobile-drawer-toggle"
            color="text"
            variant="toggle"
            iconLeading={MenuIcon}
            iconToggled={MenuOpenIcon}
            bind:expanded={isMobileDrawerOpen}
        />

        <LzButton color="text" href="/">Home</LzButton>
    </LzAppBar>
    <div class="lz-scrim" aria-hidden="true"></div>
    <LzNavigationDrawer
        id="mobile-drawer"
        variant="modal"
        drawerItems={pagesFlat}
        bind:isOpen={isMobileDrawerOpen}
    />
{/if}

{@render children?.()}

<style>
    :global(.lz-app-bar) {
        z-index: 1000;

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }

    :global(#mobile-drawer) {
        z-index: 900;
    }

    .lz-scrim {
        position: fixed;
        inset: 0;
        background: oklch(from #322f37 l c h / 0);
        transition: background var(--lz-motion-duration-short1) ease;
        pointer-events: none;
        z-index: 800;

        &:has(:global(+ #mobile-drawer[data-open])) {
            background: oklch(from #322f37 l c h / 0.4);
        }
    }
</style>
