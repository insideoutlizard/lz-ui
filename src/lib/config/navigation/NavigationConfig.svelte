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

    export function getRailItems(): LzNavItem[] {
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
    } from "#lib/components/index.ts";
    import { LzThemeSwitcher } from "#lib/util/index.ts";

    let { children } = $props();
    let navContainer: HTMLDivElement | undefined = $state();
    let currentPath = $derived(page.url.pathname);

    let isMobileSize = $state(false);
    let isDrawerHoverOnly = $state(false);
    let isDrawerAlways = $state(false);
    let isHoverOpen = $state(false);

    let sectionItems = $derived(getSectionItems(currentPath));
    let groupedSections = $derived(getGroupedSections(sectionItems));
    let currentSectionItem = $derived(getCurrentSectionItem(currentPath));
    let railItems = $derived(getRailItems());

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
        const mobile = window.matchMedia("(width <= 768px)");
        const drawerHoverOnly = window.matchMedia(
            "(width > 768px) and (width <= 1500px)",
        );
        const drawerAlways = window.matchMedia("(width > 1500px)");

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

{#snippet drawerLinks()}
    <nav class="drawer-nav">
        <ul class="drawer-links">
            {#if currentSectionItem}
                <li>
                    <LzButton
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
        <LzNavigationRail
            menuItems={navItems.filter(
                (item) =>
                    item.path === "/" ||
                    item.path.split("/").filter(Boolean).length === 1,
            )}
            ariaLabel="Primary links"
        >
            <footer class="rail-actions">
                {@render railActions()}
            </footer>
        </LzNavigationRail>
        <LzNavigationDrawer
            variant="modal"
            density="desktop"
            drawerItems={drawerLinks}
            bind:isOpen={isDrawerOpen}
            leftOffset
            compact
            skipNavigationClose
            skipNoScroll
        />
    </div>
{:else}
    <header class="lz-app-bar">
        <div class="inner">
            <p>Shitty tmp app bar!</p>
        </div>
    </header>
{/if}

{@render children?.()}
