<script lang="ts" module>
    import type { Snippet } from "svelte";

    import type { LzProps } from "#lib/types.ts";
    import type { LzNavItem } from "#lib/config/navigation/types.ts";
    import { LzButton } from "../../buttons";
    import { LzIcon } from "#lib/util/index.ts";
    import MenuIcon from "~icons/material-symbols/menu-sharp";
    import MenuOpenIcon from "~icons/material-symbols/menu-open-sharp";

    export type LzNavigationRailVariant = "collapsed" | "expanded";
    export type LzNavigationRailExpandedLayout = "standard" | "modal";

    export interface LzNavigationRailProps extends LzProps {
        variant?: LzNavigationRailVariant;
        expandedLayout?: LzNavigationRailExpandedLayout;
        showMenuToggle?: boolean;
        actionButton?: Snippet | null;
        largeBadges?: boolean;
        menuItems: LzNavItem[] | Snippet;
        expanded?: boolean;
        children?: Snippet | null;
    }
</script>

<script lang="ts">
    import { page } from "$app/state";
    import { formatClasses } from "#lib/util/types.ts";
    import "./navigation-rail.css";

    let {
        className = null,
        id = null,
        ariaLabel,
        role = null,

        variant = "collapsed",
        expandedLayout = "standard",
        showMenuToggle = false,
        actionButton = null,
        largeBadges = false,
        menuItems = [],

        expanded = $bindable(false),
        children,
        ...restProps
    }: LzNavigationRailProps = $props();

    let classes = $derived(formatClasses("lz-navigation-rail", className));

    let currentPath = $derived(page.url.pathname);
</script>

{#snippet menuButton()}
    <LzButton
        variant="toggle"
        color="text"
        {expanded}
        iconLeading={MenuIcon}
        iconToggled={MenuOpenIcon}
        overrides={["no-elevation"]}
        onclick={() => (expanded = !expanded)}
    />
{/snippet}

{#snippet navLinks()}
    {#if Array.isArray(menuItems)}
        <nav class="nav-rail-links">
            <ul>
                {#each menuItems as item}
                    {@const isCurrent = currentPath === item.path}
                    <li>
                        <LzButton
                            size="small"
                            className="nav-rail-item"
                            color={isCurrent ? "tonal" : "text"}
                            overrides={[
                                "no-elevation",
                                "full-width",
                                "label-start",
                            ]}
                            iconLeading={item.icon}
                            iconToggled={item.activeIcon}
                            current={isCurrent ? "page" : "false"}
                            href={item.path ?? ""}
                            ariaLabel={!expanded ? item.label : null}
                            label={expanded ? item.label : undefined}
                        />
                    </li>
                {/each}
            </ul>
        </nav>
    {:else if typeof menuItems === "function"}
        {@render menuItems()}
    {/if}
{/snippet}

<aside
    class={classes}
    {id}
    aria-label={ariaLabel}
    data-variant={variant}
    data-expanded={expanded ? "" : undefined}
    data-expanded-layout={expandedLayout}
    {...restProps}
>
    <div class="inner">
        {#if showMenuToggle}
            {@render menuButton()}
        {/if}

        {@render navLinks()}
        {#if children}
            {@render children()}
        {/if}
    </div>
</aside>

<style>
    @layer base {
        .lz-navigation-rail {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            border-right: var(--lz-navigation-rail-border-right);
            z-index: 150;
            transition: width var(--lz-motion-duration-short4) ease;
            padding-inline: var(--lz-spacing-space50);

            & .inner {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                padding-top: var(--lz-navigation-rail-top-space);
                gap: var(--lz-spacing-space200);
                overflow-y: auto;

                & .nav-rail-links {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;

                    & ul {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                        gap: var(--lz-spacing-space25);

                        & li {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }

    @layer variants {
        .lz-navigation-rail {
            &[data-variant="collapsed"] {
                background: var(--lz-navigation-rail-color-collapsed);
                width: var(--lz-navigation-rail-width-collapsed);
            }

            &[data-variant="expanded"] {
                background: var(--lz-navigation-rail-color-expanded);
                width: fit-content;
                min-width: var(--lz-navigation-rail-min-width-expanded);
                max-width: var(--lz-navigation-rail-max-width-expanded);
            }
        }
    }

    @layer state {
        .lz-navigation-rail {
            &[data-expanded] {
                &[data-expanded-layout="standard"] {
                }

                &[data-expanded-layout="modal"] {
                    &[data-expanded] {
                        background: red;
                    }
                }
            }
        }
    }
</style>
