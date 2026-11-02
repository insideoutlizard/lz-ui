<script lang="ts" module>
    import type { Snippet } from "svelte";

    import type { LzProps } from "#lib/types.ts";
    import type {
        LzNavItem,
        LzPrimaryItem,
        LzSecondaryItem,
    } from "#lib/config/navigation/types.ts";
    import { LzButton } from "../../buttons";
    import { LzIcon } from "#lib/util/index.ts";
    import LeftPanelOpenIcon from "~icons/material-symbols/left-panel-open-outline-sharp";
    import LeftPanelCloseIcon from "~icons/material-symbols/left-panel-close-sharp";

    export type LzNavigationRailVariant = "collapsed" | "expanded";
    export type LzNavigationRailExpandedLayout = "standard" | "modal";

    export interface LzNavigationRailProps extends LzProps {
        variant?: LzNavigationRailVariant;
        expandedLayout?: LzNavigationRailExpandedLayout;
        showMenuToggle?: boolean;
        actionButton?: Snippet | null;
        largeBadges?: boolean;
        primaryItems: LzPrimaryItem[] | Snippet;
        secondaryItems?: Snippet | null;
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
        primaryItems = [],
        secondaryItems = null,

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
        iconLeading={LeftPanelOpenIcon}
        iconToggled={LeftPanelCloseIcon}
        overrides={["no-elevation"]}
        onclick={() => (expanded = !expanded)}
    />
{/snippet}

{#snippet primaryLinks()}
    {#if Array.isArray(primaryItems)}
        <nav class="nav-rail-links">
            <ul>
                {#each primaryItems as item}
                    {@const isCurrent = currentPath === item.path}
                    <li>
                        <LzButton
                            size="small"
                            className="lz-nav-rail-primary-item"
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
    {:else if typeof primaryItems === "function"}
        {@render primaryItems()}
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
    {#if showMenuToggle}
        <header>
            {@render menuButton()}
        </header>
    {/if}
    <div class="inner">
        <div class="items">
            {@render primaryLinks()}

            {#if secondaryItems}
                <div class="secondary-items">
                    {@render secondaryItems()}
                </div>
            {/if}
        </div>

        {#if children}
            {@render children()}
        {/if}
    </div>
</aside>

<style>
    :root {
        interpolate-size: allow-keywords;
    }
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
            padding-inline: var(--lz-spacing-space50);
            box-sizing: border-box;

            & header {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                box-sizing: border-box;
                height: var(--lz-touch-target-size);
                padding-top: var(--lz-navigation-rail-top-space);
            }

            & .inner {
                display: flex;
                flex-direction: column;
                align-items: start;
                width: 100%;
                height: 100%;
                padding-inline: var(--lz-spacing-space75);
                gap: var(--lz-spacing-space200);
                overflow-y: auto;

                transition: align-items 0s ease var(--lz-motion-duration-short4);

                & .items {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    width: 100%;
                    gap: var(--lz-spacing-space200);
                }

                & .nav-rail-links {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    & ul {
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        gap: var(--lz-spacing-space25);
                    }
                }

                & .secondary-items {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    @layer state {
        .lz-navigation-rail {
            background: var(--lz-navigation-rail-color-collapsed);
            width: 100%;
            max-width: var(--lz-navigation-rail-width-collapsed);
            transition-property: max-width background;
            transition-duration: var(--lz-motion-duration-short3);
            transition-timing-function: ease-in-out;

            /* Ensure inner alignment starts centered for icon-only mode */
            & .inner {
                align-items: center;
                transition: align-items 0s ease 0s;
            }

            & .nav-rail-links ul {
                align-items: center;
            }

            & .secondary-items {
                display: none;
                opacity: 0;
                visibility: hidden;
            }

            &[data-expanded] {
                background: var(--lz-navigation-rail-color-expanded);
                max-width: var(--lz-navigation-rail-width-expanded);
                transition-timing-function: ease-out;

                & header {
                    justify-content: end;
                    padding-inline-end: var(--lz-spacing-space75);
                }

                /* Transition inner items to stretch to fill the expanded width */
                & .inner {
                    align-items: stretch;
                    transition: align-items 0s linear 0s;
                    padding-inline: var(--lz-spacing-space75);
                    box-sizing: border-box;

                    & :global(.lz-nav-rail-primary-item .surface) {
                        --lz-button-small-padding-inline: var(
                            --lz-spacing-space100
                        );
                    }
                }

                & .nav-rail-links ul {
                    align-items: stretch;
                }

                & .secondary-items {
                    display: flex;
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
</style>
