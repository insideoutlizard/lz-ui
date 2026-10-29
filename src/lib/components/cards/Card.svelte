<script lang="ts" module>
    import type { Snippet } from "svelte";
    import type { LzProps } from "#lib/types.ts";

    export type LzCardVariant = "filled" | "elevated" | "outlined";

    export interface LzCardBaseProps extends LzProps {
        variant?: LzCardVariant;

        isDefault?: boolean; /* Full-bleed media, expects it to be the first item */
        children: Snippet;
    }

    export interface LzCardStandardProps extends LzCardBaseProps {
        href?: never;
        target?: never;
        rel?: never;
    }

    export interface LzCardActionableProps extends LzCardBaseProps {
        href: string;
        target?: string | null;
        rel?: string | null;
    }

    export type LzCardProps = LzCardStandardProps | LzCardActionableProps;
</script>

<script lang="ts">
    import "./card.css";
    import { formatClasses } from "#lib/types.ts";

    let {
        className = null,
        id = null,
        ariaLabel,
        role = null,

        variant = "filled",
        isDefault = false,

        children,

        href,
        target = null,
        rel = null,
        ...restProps
    }: LzCardProps = $props();

    let classes = $derived(formatClasses("lz-card", className));

    let isActionable = $derived(Boolean(href));
</script>

{#snippet inner()}
    <div class="lz-card-inner">
        {@render children()}
    </div>
{/snippet}

<svelte:element
    this={isActionable ? "a" : "div"}
    class={classes}
    {id}
    {role}
    {href}
    {target}
    {rel}
    aria-label={ariaLabel && !isActionable ? ariaLabel : undefined}
    data-variant={variant}
    data-default={isDefault ? "" : null}
>
    {@render inner()}
</svelte:element>

<style>
    @layer lz-ui-reset, base, size, shape, color, state;

    @layer lz-ui-reset {
        .lz-card {
            all: unset;
        }
    }

    @layer base {
        .lz-card {
            display: flex;
            flex-direction: column;

            box-sizing: border-box;
            overflow: hidden;
            width: 100%;
            min-width: 0;
            min-height: 0;

            position: relative;
            padding: calc(var(--lz-card-padding) + var(--lz-density-global))
                var(--lz-card-padding);
            gap: calc(var(--lz-card-gap) + var(--lz-density-global));

            &[data-default] {
                padding: 0;
            }

            & .lz-card-inner {
                display: flex;
                flex-direction: column;
                width: 100%;
                flex: 1 1 auto;
                box-sizing: border-box;
                min-height: 0;
                min-width: 0;

                overflow: visible;
                gap: calc(var(--lz-card-gap) + var(--lz-density-global));
            }
        }
    }

    @layer color {
        .lz-card {
            &[data-variant="filled"] {
                background: var(--lz-card-filled-bg);
                color: var(--lz-card-filled-fg);
            }
            &[data-variant="elevated"] {
                background: var(--lz-card-elevated-bg);
                box-shadow: var(--lz-elevation-1);
                color: var(--lz-card-elevated-fg);
            }
            &[data-variant="outlined"] {
                background: transparent;
                box-shadow: inset 0 0 0 1px var(--lz-card-outlined-bg);
                color: var(--lz-card-outlined-fg);
            }
        }
    }

    @layer shape {
        .lz-card {
            border-radius: var(--lz-card-corner-shape);
        }
    }

    @layer state {
        a.lz-card {
            &:before {
                content: "";
                position: absolute;
                inset: 0;
                background: var(--lz-color-primary);
                opacity: 0;
            }
            @media (hover: hover) {
                &:hover {
                    cursor: pointer;

                    &:before {
                        opacity: var(--lz-opacity-hover);
                    }
                }
            }
        }
    }
</style>
