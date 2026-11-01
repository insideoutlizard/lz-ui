<script lang="ts" module>
    import type { Component } from "svelte";
    import type { LzProps } from "#lib/types.ts";

    export type LzIconToggleTransition = "swap" | "flip" | "none";

    export interface LzIconProps extends Omit<LzProps, "ariaLabel" | "role"> {
        inactiveIcon: Component;
        activeIcon?: Component | null;
        active?: boolean;
        toggleTransition?: LzIconToggleTransition;
    }
</script>

<script lang="ts">
    import { formatClasses } from "#lib/util/types.ts";

    let {
        className = "",
        id = null,
        inactiveIcon: InactiveIcon,
        activeIcon: ActiveIcon,
        active = $bindable(false),
        toggleTransition = "swap",
    }: LzIconProps = $props();

    let classes = $derived(formatClasses("lz-icon", className));
</script>

<div
    {id}
    aria-hidden="true"
    class={classes}
    data-active={active ? "" : null}
    data-transition={ActiveIcon ? toggleTransition : null}
>
    <InactiveIcon />

    {#if ActiveIcon}
        <ActiveIcon />
    {/if}
</div>

<style>
    @layer base {
        .lz-icon {
            height: var(--lz-typography-icon-size);
            width: var(--lz-typography-icon-size);
            line-height: 1;
            display: inline-block;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-shrink: 0;

            & :global(svg) {
                color: currentColor;
                width: 100%;
                height: 100%;
                display: block;
                flex-shrink: 0;

                transition-property: color, opacity, transform;
                transition-duration: var(--lz-motion-duration-short3);
            }

            &:has(> :global(svg + svg)) {
                display: grid;
                place-items: center;

                & :global(svg) {
                    grid-area: 1 / 1;
                    transform-origin: 50% 50%;
                }
            }
        }
    }

    @layer state {
        .lz-icon {
            &[data-transition="swap"] {
                & > :global(svg) {
                    opacity: 1;
                    transform: rotate(0);
                    transition-timing-function: ease-out;
                }

                & > :global(svg + svg) {
                    opacity: 0;
                    transform: rotate(10deg);
                    transition-timing-function: ease-in;
                }

                &[data-active] {
                    & > :global(svg) {
                        opacity: 0;

                        transform: rotate(10deg);
                        transition-timing-function: ease-in;
                    }

                    & > :global(svg + svg) {
                        opacity: 1;
                        transform: rotate(0);
                        transition-timing-function: ease-out;
                    }
                }
            }

            &[data-transition="flip"] {
                & > :global(svg) {
                    opacity: 1;
                    transform: rotate(0);
                    transition-timing-function: ease-out;
                }

                & > :global(svg + svg) {
                    opacity: 0;
                    transform: rotate(180deg);
                    transition-timing-function: ease-in;
                }

                &[data-active] {
                    & > :global(svg) {
                        opacity: 0;

                        transform: rotate(180deg);
                        transition-timing-function: ease-in;
                    }

                    & > :global(svg + svg) {
                        opacity: 1;
                        transform: rotate(0);
                        transition-timing-function: ease-out;
                    }
                }
            }
        }
    }
</style>
