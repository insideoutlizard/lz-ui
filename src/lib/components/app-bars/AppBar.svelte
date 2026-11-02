<script lang="ts" module>
    import type { Snippet } from "svelte";
    import type { LzProps } from "#lib/types.ts";

    export type LzAppBarVariant =
        "search" | "small" | "medium-flexible" | "large-flexible";

    export interface LzAppBarProps extends Omit<LzProps, "role"> {
        variant?: LzAppBarVariant;

        children?: Snippet;
    }
</script>

<script lang="ts">
    import { formatClasses } from "#lib/util/types.ts";

    import "./app-bar.css";

    let {
        className = null,
        id = null,
        ariaLabel,

        variant = "small",

        children,
    }: LzAppBarProps = $props();

    let classes = $derived(formatClasses("lz-app-bar", className));
</script>

<header class={classes} {id} aria-label={ariaLabel} data-variant={variant}>
    <div class="inner">
        {#if children}
            {@render children()}
        {/if}
    </div>
</header>

<style>
    @layer base {
        .lz-app-bar {
            display: flex;
            background: var(--lz-app-bar-container-color);

            width: 100%;
            box-sizing: border-box;

            padding-inline: var(--lz-spacing-space50);
            --lz-typography-icon-size: 1.5rem;
        }
    }

    @layer variants {
        .lz-app-bar {
            .inner {
                width: 100%;
                gap: var(--lz-spacing-space100);
                box-sizing: border-box;
            }

            &[data-variant="small"],
            &[data-variant="search"] {
                height: var(--lz-app-bar-small-height);
                & .inner {
                    display: flex;
                    align-items: center;
                }
            }

            &[data-variant*="medium"] {
                height: var(--lz-app-bar-medium-height);

                & .inner {
                    display: grid;
                    grid-template-columns: 1;
                    grid-template-rows: 2;
                }
            }
            &[data-variant*="large"] {
                height: var(--lz-app-bar-large-height);
            }
        }
    }
</style>
