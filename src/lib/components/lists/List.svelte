<script lang="ts" module>
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import type { LzProps } from "#lib/types.ts";
    import type { LzButtonSize } from "../buttons";

    export interface LzListProps extends LzProps {
        label: string;
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
        itemSize = "medium",
        children,
        expanded = false,
    }: LzListProps = $props();

    let wrapperEl: HTMLDivElement | undefined = undefined;
    let isExpanded = $state(false);

    onMount(() => {
        const hasActivePage = wrapperEl?.querySelector('[aria-current="page"');

        if (hasActivePage) isExpanded = true;
    });

    function expand() {
        isExpanded = !isExpanded;
    }
</script>

<div class="lz-list">
    <LzButton
        size={itemSize}
        color="text"
        onclick={expand}
        iconTrailing={OpenIcon}
        iconToggled={CollapseIcon}
        iconTrailingToggle
        className="list-expansion"
        expanded={isExpanded}
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

            & .item-list {
                min-height: 0;
                overflow-y: hidden;
                opacity: 0;
                visibility: hidden;

                transition:
                    opacity var(--lz-motion-duration-short1) ease,
                    visibility var(--lz-motion-duration-short1) ease;
            }
        }

        & .expand-wrapper[data-expanded] {
            grid-template-rows: 1fr;

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
</style>
