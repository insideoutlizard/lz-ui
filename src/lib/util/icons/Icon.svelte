<script lang="ts" module>
    import type { Component } from "svelte";
    import type { LzProps } from "#lib/types.ts";

    export interface LzIconProps extends Omit<LzProps, "ariaLabel" | "role"> {
        inactiveIcon: Component;
        activeIcon?: Component | null;
        active?: boolean;
    }
</script>

<script lang="ts">
    import { formatClasses } from "#lib/types.ts";

    let {
        className = "",
        id = "",
        inactiveIcon: InactiveIcon,
        activeIcon: ActiveIcon,
        active = $bindable(false),
    }: LzIconProps = $props();

    let classes = $derived(formatClasses("lz-icon", className));
</script>

<div {id} aria-hidden="true" class={classes} data-active={active ? "" : null}>
    <InactiveIcon />

    {#if ActiveIcon}
        <ActiveIcon />
    {/if}
</div>

<style>
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

            transition:
                color var(--lz-motion-duration-short1) ease,
                opacity var(--lz-motion-duration-short1) ease,
                transform var(--lz-motion-duration-short1) ease;
        }

        &:has(> :global(svg + svg)) {
            display: grid;
            place-items: center;

            & :global(svg) {
                grid-area: 1 / 1;
                transform-origin: 50% 50%;
            }

            & > :global(svg) {
                opacity: 1;
                transform: scale(1);
            }

            & > :global(svg + svg) {
                opacity: 0;
                transform: scale(0.85);
            }

            &[data-active] {
                & > :global(svg) {
                    opacity: 0;
                    transform: scale(0.85);
                }

                & > :global(svg + svg) {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
    }
</style>
