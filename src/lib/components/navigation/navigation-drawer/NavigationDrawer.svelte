<script lang="ts" module>
    import type { Snippet } from "svelte";

    import type { LzProps } from "#lib/types.ts";
    import type { LzNavItem } from "#lib/config/navigation/types.ts";

    export type LzNavigationDrawerVariant = "standard" | "modal";
    export type LzNavigationDrawerDensity = "standard" | "desktop";

    export interface LzNavigationDrawerProps extends LzProps {
        variant?: LzNavigationDrawerVariant;
        isOpen?: boolean;

        drawerItems: LzNavItem[] | Snippet;
        children?: Snippet | null;

        leftOffset?: boolean;
        compact?: boolean;
        density?: LzNavigationDrawerDensity;
        skipNavigationClose?: boolean;
        skipNoScroll?: boolean;
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";

    import { formatClasses } from "#lib/util/types.ts";
    import "./navigation-drawer.css";
    import { LzButton } from "../../buttons";
    import { LzIcon } from "#lib/util/index.ts";

    let {
        className = null,
        id = null,
        ariaLabel,
        role = null,

        variant = "standard",
        isOpen = $bindable(false),
        drawerItems = [],
        children,

        anchorName = null,
        leftOffset = false,
        compact = false,
        density = "standard",
        skipNavigationClose = false,
        skipNoScroll = false,

        ...restProps
    }: LzNavigationDrawerProps = $props();

    let isClosing = $state(false);

    $effect(() => {
        if (variant === "modal" && !skipNoScroll) {
            if (isOpen || isClosing) {
                document.documentElement.classList.add("no-scroll");
            } else {
                document.documentElement.classList.remove("no-scroll");
            }

            return () => {
                document.documentElement.classList.remove("no-scroll");
            };
        }
    });

    function close(): Promise<void> {
        if (!isOpen || isClosing) return Promise.resolve();
        isClosing = true;

        return new Promise((resolve) => {
            setTimeout(() => {
                isClosing = false;
                isOpen = false;
                resolve();
            }, 200);
        });
    }

    /*
      Handle drawer closing during page swap
    */
    function interceptNavigation(event: Event) {
        if (skipNavigationClose) return;

        const customEvent = event as CustomEvent<{
            waitFor: (p: Promise<void>) => void;
        }>;

        if (!isOpen || isClosing) return;

        const closurePromise = close();

        if (typeof customEvent.detail?.waitFor === "function") {
            customEvent.detail.waitFor(closurePromise);
        }
    }

    $effect(() => {
        document.addEventListener("lz:navigating", interceptNavigation);

        return () => {
            document.removeEventListener("lz:navigating", interceptNavigation);
        };
    });

    // onMount(() => {
    //     isOpen = false;
    // });

    let classes = $derived(formatClasses("lz-navigation-drawer", className));

    let currentPath = $derived(page.url.pathname);
</script>

{#snippet navLinks()}
    {#if Array.isArray(drawerItems)}
        <nav class="links">
            <ul>
                {#each drawerItems as item}
                    {@const isCurrent = currentPath === item.path}
                    <li>
                        <LzButton
                            size={density === "desktop" ? "small" : "medium"}
                            className="lz-navigation-drawer-item"
                            overrides={["no-elevation"]}
                            color={isCurrent ? "tonal" : "text"}
                            href={item.path}
                            current={isCurrent ? "page" : "false"}
                        >
                            {item.label}</LzButton
                        >
                    </li>
                {/each}
            </ul>
        </nav>
    {:else if typeof drawerItems === "function"}
        {@render drawerItems()}
    {/if}
{/snippet}

<aside
    class={classes}
    {id}
    aria-label={isOpen ? ariaLabel : null}
    aria-hidden={!isOpen}
    data-open={isOpen ? "" : null}
    data-closing={isClosing ? "" : null}
    data-variant={variant}
    data-left-offset={leftOffset ? "" : null}
    data-compact={compact ? "" : null}
    data-density={density}
    style={anchorName
        ? `position: absolute; position-anchor: ${anchorName}; position-area: right span-all`
        : null}
    {...restProps}
>
    <div class="inner">
        {@render navLinks()}

        {#if children}
            {@render children()}
        {/if}
    </div>
</aside>

<style>
    @layer base {
        .lz-navigation-drawer {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 100;
            border-top-right-radius: var(--lz-shape-corner-radius-lg);
            border-bottom-right-radius: var(--lz-shape-corner-radius-lg);

            width: fit-content;
            max-width: 22.5rem;

            &[data-left-offset] {
                left: var(--lz-navigation-rail-width);
            }

            & .inner {
                display: flex;
                flex-direction: column;
                padding-inline: var(--lz-spacing-space150);
                margin: var(--lz-spacing-space200) 0;

                .links :global(.lz-navigation-drawer-item) {
                    width: 100%;

                    & :global(.surface) {
                        width: 100%;
                        justify-content: start;
                        --lz-button-medium-font: normal normal
                            var(--lz-typography-font-weight-medium) normal
                            var(--lz-typescale-label-l-font-size)/var(
                                --lz-typescale-label-l-line-height
                            )
                            var(--lz-typography-typeface-plain);
                        --lz-button-medium-letter-spacing: var(
                            --lz-typescale-label-l-font-tracking
                        );
                        --lz-button-medium-font-variation-settings: var(
                            --lz-typescale-label-l-font-wght
                        );
                    }
                }
            }

            &[data-compact],
            &[data-density="desktop"] {
                width: 12rem;
            }

            &[data-density="desktop"] {
                .inner {
                    padding-inline: var(--lz-spacing-space100);

                    & .links {
                        gap: var(--lz-spacing-space25);
                    }
                }
            }
        }
    }

    @layer color {
        .lz-navigation-drawer {
            &[data-variant="standard"] {
                background: var(--lz-color-surface);
            }

            &[data-variant="modal"] {
                background: var(--lz-color-surface-container-low);
            }
        }
    }

    @layer state {
        .lz-navigation-drawer {
            &
                .inner
                .links
                :global(
                    .lz-navigation-drawer-item[aria-current="page"] .surface
                ) {
                --lz-button-medium-font: normal normal
                    var(--lz-typography-font-weight-bold) normal
                    var(--lz-typescale-label-l-font-size)/var(
                        --lz-typescale-label-l-line-height
                    )
                    var(--lz-typography-typeface-plain);
                --lz-button-medium-letter-spacing: var(
                    --lz-typescale-label-l-font-tracking
                );
                --lz-button-medium-font-variation-settings: "wght"
                    var(--lz-typography-font-weight-bold);
            }

            @media (hover: hover) {
                &:hover {
                    box-shadow: var(--lz-elevation-1);
                }
            }

            &[data-variant="modal"] {
                box-shadow: var(--lz-elevation-0);
                transition: box-shadow var(--lz-motion-duration-short4) ease;

                &:not([data-open]) {
                    transform: translateX(-100%);
                    transform-origin: left;
                    transition: transform var(--lz-motion-duration-short4)
                        ease-in-out;

                    & .inner {
                        transform: translateX(-100%);
                        transform-origin: left;
                        transition: transform var(--lz-motion-duration-medium1)
                            ease-in-out;
                        transition-delay: var(--lz-motion-duration-short1);
                    }
                }

                &[data-open] {
                    transform: translateX(1);
                    box-shadow: var(--lz-elevation-1);

                    transition: transform var(--lz-motion-duration-short4)
                        ease-out;

                    & .inner {
                        transform: translateX(1);

                        transition: transform var(--lz-motion-duration-short4)
                            ease-out;
                        transition-delay: var(--lz-motion-duration-short1);
                    }
                }
            }
        }
    }
</style>
