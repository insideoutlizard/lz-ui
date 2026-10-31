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

    import { navItems } from "#lib/config/navigation/NavigationConfig.svelte";

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);

    let isMobileSize = $state(false);
    let isDrawerHoverOnly = $state(false);
    let isDrawerAlways = $state(false);
    let isHoverOpen = $state(false);

    let sectionItems = $derived.by(() => {
        if (currentPath === "/") return [];
        const segments = currentPath.split("/").filter(Boolean);
        const base = `/${segments[0]}`;
        return navItems.filter(
            (item) => item.path !== base && item.path.startsWith(base),
        );
    });

    let groupedSections = $derived.by(() => {
        const groups = new Map<string, typeof sectionItems>();
        const standalone: typeof sectionItems = [];

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
    });

    let currentSectionItem = $derived.by(() => {
        if (currentPath === "/") return null;
        const segments = currentPath.split("/").filter(Boolean);
        if (segments.length === 0) return null;
        const base = `/${segments[0]}`;
        return navItems.find((item) => item.path === base);
    });

    let isDrawerOpen = $derived(
        sectionItems.length > 0 &&
            !isMobileSize &&
            (isDrawerAlways || isHoverOpen),
    );
    $effect(() => {
        currentPath;
        if (isDrawerHoverOnly) {
            isHoverOpen = false;
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
        }

        const handleMobile = (e: MediaQueryListEvent) => {
            isMobileSize = e.matches;
        };

        const handleDrawerHoverOnly = (e: MediaQueryListEvent) => {
            isDrawerHoverOnly = e.matches;
            if (e.matches) isHoverOpen = false;
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

{#snippet themeSwitcher()}
    <LzThemeSwitcher />
{/snippet}

{#snippet listItem(path: string, label: string)}
    {@const isCurrent = currentPath === path}

    <LzButton
        size="small"
        color={isCurrent ? "tonal" : "text"}
        href={path}
        className="lz-drawer-group-item"
        current={isCurrent ? "page" : "false"}
    >
        {label}
    </LzButton>
{/snippet}

{#snippet drawerLinks()}
    <nav class="drawer-nav">
        <ul class="drawer-links">
            {#if currentSectionItem}
                <li>
                    <LzButton
                        color="text"
                        href={currentSectionItem.path}
                        className="lz-navigation-drawer-item"
                    >
                        {currentSectionItem.label} overview
                    </LzButton>
                </li>
            {/if}
            {#each [...groupedSections.groups.entries()] as [groupName, items]}
                <li>
                    <LzList label={groupName} itemSize="small">
                        {#each items as item}
                            {@const isCurrent = currentPath === item.path}
                            <li>
                                <LzButton
                                    size="small"
                                    color={isCurrent ? "tonal" : "text"}
                                    href={item.path}
                                    className="lz-drawer-group-item"
                                    current={isCurrent ? "page" : "false"}
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
                    >
                        {item.label}
                    </LzButton>
                </li>
            {/each}
        </ul>
    </nav>
{/snippet}

{#if !isMobileSize}
    <div
        role="region"
        aria-label="Navigation container"
        class="nav-container"
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
            skipNavigationClose
        />
    </div>
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
