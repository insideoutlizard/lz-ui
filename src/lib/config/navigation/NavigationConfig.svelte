<script lang="ts" module>
    import type {
        LzPageGroup,
        LzPageMeta,
        LzNavigationNode,
        LzPage,
    } from "./types";

    const pages = import.meta.glob("#routes/**/+page.svelte", {
        eager: true,
    });

    export const navPages: LzPage[] = Object.entries(pages).map(
        ([filePath, module]: [string, any]) => {
            let path = filePath
                .replace(/^.*\/routes/, "")
                .replace("/+page.svelte", "");
            if (path === "") path = "/";

            const meta: LzPageMeta = module.meta || {
                label: path.split("/").pop()?.replace(/-/g, " ") || "Index",
            };

            return {
                path,
                label: meta.label,
                icon: meta.icon ?? null,
                activeIcon: meta.activeIcon ?? null,
                order: meta.order ?? undefined,
                group: meta.group ?? undefined,
            };
        },
    );

    export const getNavNodes = (): LzNavigationNode[] => {
        const pages = [...navPages].sort((a, b) =>
            a.label.localeCompare(b.label),
        );

        const groups = new Map<LzPageGroup, LzNavigationNode[]>();
        const nodes: LzNavigationNode[] = [];

        for (const page of pages) {
            if (!page.group) {
                nodes.push({
                    page,
                });

                continue;
            }

            const children = groups.get(page.group) ?? [];

            children.push({
                page,
            });

            groups.set(page.group, children);
        }

        for (const [group, children] of groups) {
            const overview = pages.find(
                (page) => page.path === `/${group.toLowerCase()}`,
            );

            if (!overview) continue;

            nodes.push({
                page: overview,
                children: children
                    .filter((child) => child.page.path !== overview.path)
                    .sort((a, b) => {
                        const ao = a.page.order ?? Number.MAX_SAFE_INTEGER;
                        const bo = b.page.order ?? Number.MAX_SAFE_INTEGER;

                        if (ao !== bo) return ao - bo;

                        return a.page.label.localeCompare(b.page.label);
                    }),
            });
        }

        return nodes.sort((a, b) => a.page.label.localeCompare(b.page.label));
    };
</script>

<script lang="ts">
    import { page } from "$app/state";

    import {
        LzButton,
        LzList,
        LzNavigationRail,
        LzNavigationDrawer,
        LzAppBar,
        type LzButtonSize,
    } from "#lib/components/index.ts";
    import { LzThemeSwitcher } from "#lib/util/index.ts";

    import MenuIcon from "~icons/material-symbols/menu-sharp";
    import MenuOpenIcon from "~icons/material-symbols/menu-open-sharp";
    import ArrowBackIcon from "~icons/material-symbols/arrow-back-sharp";
    import ArrowForwardIcon from "~icons/material-symbols/arrow-forward-sharp";

    let { children } = $props();

    let currentPath = $derived(page.url.pathname);

    let isMobileSize = $state(false);
    let isMobileDrawerOpen = $state(false);
    let userToggledView = $state<"main" | "sections">("main");

    let mobileViewMode = $derived.by(() => {
        if (userToggledView === null) return userToggledView;
        return currentPath.split("/").length > 1 ? "secondary" : "primary";
    });

    $effect(() => {
        const mobile = window.matchMedia("(width < 600px)");
        isMobileSize = mobile.matches;

        const handleMobile = (e: MediaQueryListEvent) => {
            isMobileSize = e.matches;
        };
        mobile.addEventListener("change", handleMobile);
        return () => {
            mobile.removeEventListener("change", handleMobile);
        };
    });
</script>

{#snippet navTree(items: LzNavigationNode[], size: LzButtonSize)}
    <ul>
        {#each items as item}
            <li>
                {#if item.children}
                    <LzList
                        label={item.page.label}
                        width="full"
                        itemSize={size}
                    >
                        <p>TEST</p>
                        <LzButton {size} href={item.page.path}>
                            {item.page.label}
                        </LzButton>

                        {@render navTree(item.children, size)}
                    </LzList>
                {:else}
                    <LzButton {size} href={item.page.path}>
                        {item.page.label}
                    </LzButton>
                {/if}
            </li>
        {/each}
    </ul>
{/snippet}

{#snippet railActions()}
    <LzThemeSwitcher />
{/snippet}

{#if !isMobileSize}
    <LzNavigationRail
        showMenuToggle
        actionButton={railActions}
        ariaLabel="Primary"
    >
        {@render navTree(getNavNodes(), "small")}

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
        drawerItems={mobileDrawerContent}
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
