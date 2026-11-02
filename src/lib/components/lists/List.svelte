<script lang="ts" module>
    import type { Snippet, Component } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import type { LzProps } from "#lib/types.ts";
    import type { LzButtonSize } from "../buttons";

    export type LzListWidth = "fit-largest" | "full";

    export interface LzListProps extends LzProps {
        label: string;
        iconLeading?: Component | null;
        width?: LzListWidth;
        itemSize?: LzButtonSize;
        children: Snippet;
        expanded?: boolean;
    }
</script>

<script lang="ts">
    import { LzButton } from "../buttons";
    import { onMount } from "svelte";
    import { LzIcon } from "#lib/util/index.ts";

    import OpenIcon from "~icons/material-symbols/arrow-drop-down-sharp";
    import CollapseIcon from "~icons/material-symbols/arrow-drop-up-sharp";

    let {
        className = "",
        id = "",
        ariaLabel,
        role = "",

        label = "List label",
        iconLeading: IconLeading,
        width = "fit-largest",
        itemSize = "medium",
        children,
        expanded = false,
    }: LzListProps = $props();

    let wrapperEl: HTMLDivElement | undefined = undefined;
    let manualOverride = $state<boolean | null>(null);
    let isExpanded = $derived(
        manualOverride !== null ? manualOverride : expanded,
    );

    onMount(() => {
        const hasActivePage = wrapperEl?.querySelector('[aria-current="page"]');

        if (hasActivePage) isExpanded = true;
    });

    function expand() {
        isExpanded = !isExpanded;
    }
</script>

<div class="lz-list">
    <LzButton
        variant="toggle"
        size={itemSize}
        color="text"
        onclick={expand}
        iconLeading={IconLeading}
        iconTrailing={OpenIcon}
        className="expand-toggle"
        expanded={isExpanded}
        overrides={["trailing-toggle-icon", "full-width", "label-start"]}
    >
        {label}
    </LzButton>
    <div
        class="expand-wrapper"
        data-expanded={isExpanded ? "" : null}
        bind:this={wrapperEl}
    >
        <ul class="item-list">
            {@render children()}
        </ul>
    </div>
</div>

<style>
    .lz-list {
        display: flex;
        flex-direction: column;
        position: relative;

        & .expand-wrapper {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows var(--lz-motion-duration-short2) ease;

            position: relative;

            &:before {
                content: "";
                position: absolute;
                top: var(--lz-spacing-space50);
                bottom: calc(100% - var(--lz-spacing-space50));
                left: var(--lz-spacing-space75);
                width: 1px;
                background: oklch(
                    from var(--lz-color-outline-variant) l c h / 0
                );
                transition:
                    bottom var(--lz-motion-duration-short4) ease,
                    background var(--lz-motion-duration-short4) ease;
            }

            & .item-list {
                min-height: 0;
                overflow-y: hidden;
                opacity: 0;
                visibility: hidden;
                padding-left: var(--lz-spacing-space200);

                transition:
                    opacity var(--lz-motion-duration-short1) ease,
                    visibility var(--lz-motion-duration-short1) ease;
            }
        }

        & .expand-wrapper[data-expanded] {
            grid-template-rows: 1fr;

            &:before {
                bottom: var(--lz-spacing-space50);
                background: oklch(
                    from var(--lz-color-outline-variant) l c h / 0.5
                );
            }

            & .item-list {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    .item-list {
        display: flex;
        flex-direction: column;
        gap: var(--lz-spacing-space25);
    }

    :global(.lz-button[aria-expanded="true"].expand-toggle) {
        & :global(.lz-icon.trailing) {
            transform: rotate(180deg);
        }
    }
</style>
