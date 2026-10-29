<script lang="ts" module>
    import type { Snippet } from "svelte";

    import type { LzProps } from "#lib/types.ts";
    import type { LzNavItem } from "../types";
    import { LzButton } from "../../buttons";
    import { LzIcon } from "../../icons";
    import MenuIcon from "~icons/material-symbols/menu-sharp";
    import MenuOpenIcon from "~icons/material-symbols/menu-open-sharp";

    export type LzNavigationRailVariant = "collapsed" | "expanded";
    export type LzNavigationRailExpandedLayout = "standard" | "modal";

    export interface LzNavigationRailProps extends LzProps {
        menu?: boolean;
        actionButton?: Snippet | null;
        largeBadges?: boolean;
        menuItems: LzNavItem[] | Snippet;
        expanded?: boolean;
        children?: Snippet | null;
    }
</script>

<script lang="ts">
    import { page } from "$app/state";
    import { formatClasses } from "#lib/types.ts";
    import "./navigation-rail.css";

    let {
        className = null,
        id = null,
        ariaLabel,
        role = null,

        menu = false,
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
    <LzButton variant="toggle" {expanded} />
{/snippet}

{#snippet navLinks()}
    {#if Array.isArray(menuItems)}
        <nav class="nav-rail-links">
            <ul>
                {#each menuItems as item}
                    {@const isCurrent = currentPath === item.path}
                    <li>
                        <a
                            class="nav-rail-item"
                            href={item.path}
                            aria-current={isCurrent ? "page" : "false"}
                        >
                            <LzButton
                                size="x-small"
                                className="nav-rail-item-active-indicator"
                                color={isCurrent ? "tonal" : "text"}
                                overrides={["no-elevation", "blank-tag"]}
                                tabindex={-1}
                            >
                                <LzIcon
                                    active={isCurrent}
                                    inactiveIcon={item.icon}
                                    activeIcon={item.activeIcon}
                                />
                            </LzButton>

                            <span class="nav-rail-item-label">{item.label}</span
                            >
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    {/if}
{/snippet}

<aside class={classes} {id} aria-label={ariaLabel} {...restProps}>
    <div class="inner">
        {@render navLinks()}
        {#if children}
            <div class="actions">
                {@render children()}
            </div>
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
            background: var(--lz-navigation-rail-bg);
            width: var(--lz-navigation-rail-width);

            & .inner {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                padding-top: var(--lz-navigation-rail-top-space);

                & .actions {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: auto;
                    width: 100%;
                    gap: var(--lz-spacing-space100);
                    margin-bottom: var(--lz-spacing-space200);
                }

                & .nav-rail-links {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;

                    & ul {
                        display: flex;
                        flex-direction: column;

                        width: 100%;
                        gap: var(--lz-spacing-space200);
                    }

                    & .nav-rail-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;

                        gap: var(--lz-spacing-space75);
                        text-decoration: none;
                        position: relative;
                        padding: 2px;
                        box-sizing: border-box;

                        &:before {
                            content: "";
                            position: absolute;
                            background: var(--lz-color-secondary-container);
                            inset: 0;
                            opacity: 0;
                        }

                        &:focus-visible {
                            outline: var(
                                    --lz-navigation-rail-item-focus-ring-width
                                )
                                solid
                                var(--lz-navigation-rail-item-focus-ring-color);
                            outline-offset: var(
                                --lz-navigation-rail-item-focus-ring-offset
                            );
                            z-index: 999;

                            &:before {
                                opacity: var(--lz-opacity-focus);
                            }
                        }

                        & :global(.nav-rail-item-active-indicator) {
                            z-index: 1;

                            & :global(.surface) {
                                width: 3.5rem;
                                z-index: 1;
                            }
                        }

                        & .nav-rail-item-label {
                            color: var(--lz-color-on-surface-variant);
                            font-family: var(--lz-typography-typeface-plain);
                            font-size: var(--lz-typescale-label-m-font-size);
                            letter-spacing: var(
                                --lz-typescale-label-m-font-tracking
                            );
                            font-weight: var(
                                --lz-typescale-label-m-font-weight
                            );
                            font-variation-settings: var(
                                --lz-typescale-label-m-font-wght
                            );
                        }
                    }
                }
            }
        }
    }
</style>
