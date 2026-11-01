<script lang="ts" module>
    import type { LzNavItem, LzPageMeta } from "./types";

    const pages = import.meta.glob("#routes/**/+page.svelte", {
        eager: true,
    });

    export const navItems: LzNavItem[] = Object.entries(pages)
        .map(([filePath, module]: [string, any]) => {
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
                order: meta.order ?? 99,
                group: meta.group ?? undefined,
            };
        })
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    export function getSectionItems(currentPath: string): LzNavItem[] {
        if (currentPath === "/") return [];
        const segments = currentPath.split("/").filter(Boolean);
        const base = `/${segments[0]}`;
        return navItems.filter(
            (item) => item.path !== base && item.path.startsWith(base),
        );
    }

    export function getGroupedSections(sectionItems: LzNavItem[]) {
        const groups = new Map<string, LzNavItem[]>();
        const standalone: LzNavItem[] = [];

        sectionItems.forEach((item) => {
            if (item.group) {
                if (!groups.has(item.group)) {
                    groups.set(item.group, []);
                }
                groups.get(item.group)!.push(item);
            } else {
                standalone.push(item);
            }
        });

        return { groups, standalone };
    }

    export function getCurrentSectionItem(
        currentPath: string,
    ): LzNavItem | null {
        if (currentPath === "/") return null;
        const segments = currentPath.split("/").filter(Boolean);
        if (segments.length === 0) return null;
        const base = `/${segments[0]}`;
        return navItems.find((item) => item.path === base) || null;
    }

    export function getTopLevelItems(): LzNavItem[] {
        return navItems.filter(
            (item) =>
                item.path === "/" ||
                item.path.split("/").filter(Boolean).length === 1,
        );
    }
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
        return sectionItems.length > 0 ? "sections" : "main";
    });

    let isDrawerHoverOnly = $state(false);
    let isDrawerAlways = $state(false);
    let isHoverOpen = $state(false);

    let sectionItems = $derived(getSectionItems(currentPath));
    let groupedSections = $derived(getGroupedSections(sectionItems));
    let currentSectionItem = $derived(getCurrentSectionItem(currentPath));
    let railItems = $derived(getTopLevelItems());

    let isDrawerOpen = $derived(
        sectionItems.length > 0 &&
            !isMobileSize &&
            (isDrawerAlways || isHoverOpen),
    );

    $effect(() => {
        currentPath;
        if (isDrawerHoverOnly && navContainer) {
            isHoverOpen = navContainer.matches(":hover");
        }
    });

    $effect(() => {
        const mobile = window.matchMedia("(width < 600px)");
        const drawerHoverOnly = window.matchMedia(
            "(width >= 600px) and (width < 1600px)",
        );
        const drawerAlways = window.matchMedia("(width >= 1600px)");

        isMobileSize = mobile.matches;

        isDrawerHoverOnly = drawerHoverOnly.matches;
        isDrawerAlways = drawerAlways.matches;

        if (drawerAlways.matches) {
            isHoverOpen = true;
        } else if (drawerHoverOnly.matches && navContainer?.matches(":hover")) {
            isHoverOpen = true;
        }

        const handleMobile = (e: MediaQueryListEvent) => {
            isMobileSize = e.matches;
        };

        const handleDrawerHoverOnly = (e: MediaQueryListEvent) => {
            isDrawerHoverOnly = e.matches;
            if (e.matches) {
                isHoverOpen = Boolean(navContainer?.matches(":hover"));
            } else {
                isHoverOpen = false;
            }
        };

        const handleDrawerAlways = (e: MediaQueryListEvent) => {
            isDrawerAlways = e.matches;
            if (e.matches) isHoverOpen = true;
        };

        mobile.addEventListener("change", handleMobile);
        drawerHoverOnly.addEventListener("change", handleDrawerHoverOnly);
        drawerAlways.addEventListener("change", handleDrawerAlways);

        return () => {
            mobile.removeEventListener("change", handleMobile);
            drawerHoverOnly.removeEventListener(
                "change",
                handleDrawerHoverOnly,
            );
            drawerAlways.removeEventListener("change", handleDrawerAlways);
        };
    });
</script>

{#snippet desktopDrawerContent(size: LzButtonSize = "small")}
    <nav class="drawer-nav">
        <ul class="drawer-links">
            {#if currentSectionItem}
                <li>
                    <LzButton
                        size={size ? size : "small"}
                        color="text"
                        href={currentSectionItem.path}
                        className="drawer-header"
                        overrides={[
                            "full-width",
                            "label-start",
                            "no-elevation",
                        ]}
                    >
                        {currentSectionItem.label} overview
                    </LzButton>
                </li>
            {/if}
            {#each [...groupedSections.groups.entries()] as [groupName, items]}
                <li>
                    <LzList label={groupName} width="full" itemSize="small">
                        {#each items as item}
                            {@const isCurrent = currentPath === item.path}
                            <li>
                                <LzButton
                                    size="small"
                                    color={isCurrent ? "tonal" : "text"}
                                    href={item.path}
                                    className="lz-drawer-group-item"
                                    current={isCurrent ? "page" : "false"}
                                    overrides={[
                                        "full-width",
                                        "label-start",
                                        "no-elevation",
                                    ]}
                                >
                                    <li class="lz-navigation-drawer-item">
                                        {item.label}
                                    </li>
                                </LzButton>
                            </li>
                        {/each}
                    </LzList>
                </li>
            {/each}

            {#each groupedSections.standalone as item}
                <li>
                    <LzButton
                        color={currentPath === item.path ? "tonal" : "text"}
                        href={item.path}
                        className="lz-navigation-drawer-item"
                        overrides={[
                            "full-width",
                            "label-start",
                            "no-elevation",
                        ]}
                    >
                        {item.label}
                    </LzButton>
                </li>
            {/each}
        </ul>
    </nav>
{/snippet}

{#snippet mobileDrawerContent()}
    <nav class="drawer-nav">
        {#if mobileViewMode === "sections"}
            <LzButton
                color="text"
                size="medium"
                iconLeading={ArrowBackIcon}
                onclick={() => (mobileViewMode = "main")}
                overrides={["label-start", "no-elevation", "full-width"]}
                className="mobile-back-btn"
            >
                Main menu
            </LzButton>
            {@render desktopDrawerContent("medium")}
        {:else}
            <ul class="drawer-links">
                {#each railItems as item}
                    {@const hasSubSections =
                        item.path !== "/" &&
                        getSectionItems(item.path).length > 0}
                    <li>
                        <div class="mobile-nav-row">
                            <LzButton
                                size="medium"
                                color={currentPath === item.path
                                    ? "tonal"
                                    : "text"}
                                href={item.path}
                                className="lz-navigation-drawer-item"
                                iconTrailing={hasSubSections
                                    ? ArrowForwardIcon
                                    : null}
                                onclick={hasSubSections
                                    ? () => {
                                          mobileViewMode = "sections";
                                      }
                                    : undefined}
                                overrides={[
                                    "full-width",
                                    "label-start",
                                    "no-elevation",
                                ]}
                            >
                                {item.label}
                            </LzButton>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    </nav>
{/snippet}

{#snippet railActions()}
    <LzThemeSwitcher />
{/snippet}

{#if !isMobileSize}
    <div
        role="region"
        aria-label="Navigation container"
        class="nav-container"
        bind:this={navContainer}
        onmouseenter={() => {
            if (isDrawerHoverOnly) isHoverOpen = true;
        }}
        onmouseleave={() => {
            if (isDrawerHoverOnly) isHoverOpen = false;
        }}
    >
        <LzNavigationRail menuItems={railItems} ariaLabel="Primary links">
            <footer class="rail-actions">
                {@render railActions()}
            </footer>
        </LzNavigationRail>
        <LzNavigationDrawer
            variant="modal"
            density="desktop"
            drawerItems={desktopDrawerContent}
            bind:isOpen={isDrawerOpen}
            leftOffset
            compact
            skipNavigationClose
            skipNoScroll
        />
    </div>
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
