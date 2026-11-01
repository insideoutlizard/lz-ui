<script lang="ts" module>
    import type {
        LzNavItem,
        LzPageGroup,
        LzPageMeta,
        LzNavGroup,
        LzSecondaryItem,
    } from "./types";

    const pages = import.meta.glob("#routes/**/+page.svelte", {
        eager: true,
    });

    export const navItems: LzNavItem[] = Object.entries(pages).map(
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

    export const getPrimaryLinks = (): LzNavItem[] => {
        return navItems.filter(
            (item) => (item.path ?? "").split("/").filter(Boolean).length <= 1,
        );
    };

    export const getSecondaryLinks = (): LzNavItem[] => {
        return navItems.filter(
            (item) => (item.path ?? "").split("/").filter(Boolean).length > 1,
        );
    };

    export const getSecondaryNavigation = (): LzSecondaryItem[] => {
        const items = getSecondaryLinks();

        const result: LzSecondaryItem[] = [];
        const processed = new Set<LzPageGroup>();

        for (const item of items) {
            if (!item.group) {
                result.push(item);
                continue;
            }

            if (processed.has(item.group)) {
                continue;
            }

            result.push({
                label: item.group,
                items: items.filter((i) => i.group === item.group),
            });

            processed.add(item.group);
        }

        return result.sort((a, b) => a.label.localeCompare(b.label));
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
    let navContainer: HTMLDivElement | undefined = $state();
    let currentPath = $derived(page.url.pathname);

    let isMobileSize = $state(false);
    let isMobileDrawerOpen = $state(false);
    let userToggledView = $state<"main" | "sections">("main");
    let mobileViewMode = $derived.by(() => {
        if (userToggledView === null) return userToggledView;
        return currentPath.split("/").length > 1 ? "secondary" : "primary";
    });

    let isDrawerHoverOnly = $state(false);
    let isDrawerAlways = $state(false);
    let isHoverOpen = $state(false);

    $effect(() => {
        currentPath;
        if (isDrawerHoverOnly && navContainer) {
            isHoverOpen = navContainer.matches(":hover");
        }
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

{#snippet secondaryLinks(size: LzButtonSize)}
    <ul>
        {#each getSecondaryNavigation() as item}
            {#if "items" in item}
                <LzList label={item.label} width="full" itemSize={size}>
                    {#each item.items as child}
                        {@const isCurrent = currentPath === child.path}
                        <li>
                            <LzButton
                                {size}
                                color={isCurrent ? "tonal" : "text"}
                                href={child.path}
                                className="lz-drawer-group-item"
                                current={isCurrent ? "page" : "false"}
                                overrides={[
                                    "full-width",
                                    "label-start",
                                    "no-elevation",
                                ]}
                            >
                                {child.label}
                            </LzButton>
                        </li>
                    {/each}
                </LzList>
            {:else}
                <LzButton
                    {size}
                    color={currentPath === item.path ? "tonal" : "text"}
                    href={item.path ?? ""}
                    overrides={["full-width", "label-start", "no-elevation"]}
                >
                    {item.label}
                </LzButton>
            {/if}
        {/each}
    </ul>
{/snippet}

{#snippet expandedRailContent()}
    <nav aria-label="Secondary">
        {@render secondaryLinks("small")}
    </nav>
{/snippet}

{#snippet mobileDrawerContent()}
    <nav aria-label="Secondary">
        {@render secondaryLinks("medium")}
    </nav>
{/snippet}

{#snippet railActions()}
    <LzThemeSwitcher />
{/snippet}

{#if !isMobileSize}
    <LzNavigationRail
        showMenuToggle
        actionButton={railActions}
        menuItems={getPrimaryLinks()}
        ariaLabel="Primary"
    >
        {@render expandedRailContent()}
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
    :global(.lz-navigation-rail) {
        &:global([data-variant="collapsed"]) {
            & nav[aria-label="Secondary"] {
                opacity: 0;
            }
        }

        &:global([data-variant="expanded"]) {
            & nav[aria-label="Secondary"] {
                opacity: 1;
                display: flex;
            }
        }
    }
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
