<!--
    Reference: https://m3.material.io/components/buttons/specs
-->
<script lang="ts" module>
    import {
        type HTMLAttributes,
        type HTMLButtonAttributes,
    } from "svelte/elements";
    import { type Component, type Snippet } from "svelte";

    import type { LzProps } from "#lib/types.ts";

    export type LzButtonColor =
        "filled" | "tonal" | "text" | "outlined" | "elevated";
    export type LzButtonVariant = "default" | "toggle";
    export type LzButtonSize =
        "small" | "x-small" | "medium" | "large" | "x-large";
    export type LzButtonShape = "round" | "square";
    /*
      These override default m3 specs. Since these aren't scoped because of the global .css file,
      these overrides can negate having to add extra :gloab() overrides.
      example:
        - outlined button with tertiary override would set the border + text color.
    */
    export type LzButtonOverride =
        | "primary"
        | "secondary"
        | "tertiary"
        | "inverse"
        | "fixed"
        | "neutral"
        | "brand-font";

    export interface LzButtonBaseProps extends LzProps {
        // Material 3
        color?: LzButtonColor;
        variant?: LzButtonVariant;
        size?: LzButtonSize;
        shape?: LzButtonShape;
        overrides?: LzButtonOverride[] | null;

        // Surface
        label?: string;
        children?: Snippet;
        iconLeading?: Component | null;
        iconTrailing?: Component | null;
        iconToggled?: Component | null;

        // <button>
        type?: HTMLButtonAttributes["type"];
        name?: string;

        // state & events
        active?: boolean;
        pressed?: boolean;
        disabled?: boolean;
        expanded?: boolean;
        onclick?: (e: MouseEvent | KeyboardEvent) => void;
        anchorName?: string | null;
    }

    export interface LzButtonStandardProps extends LzButtonBaseProps {
        href?: never;
        target?: never;
        current?: never;
    }

    export interface LzButtonIconOnlyProps extends LzButtonBaseProps {
        ariaLabel: string;
        href?: never;
        target?: never;
        current?: never;
    }

    export interface LzButtonLinkProps extends LzButtonBaseProps {
        current?: HTMLAttributes<HTMLAnchorElement>["aria-current"];
        href: string;
        target?: string | null;
    }

    export type LzButtonProps =
        LzButtonStandardProps | LzButtonIconOnlyProps | LzButtonLinkProps;
</script>

<script lang="ts">
    import "./button.css";
    import { formatClasses } from "#lib/types.ts";

    let {
        className = null,
        id = null,
        ariaLabel,
        role = null,

        color = "filled",
        variant = "default",
        size = "small",
        shape = "round",
        overrides = null,

        label,
        children,
        iconLeading: IconLeading,
        iconTrailing: IconTrailing,
        iconToggled: IconToggled,

        type = "button",
        name,

        pressed = $bindable(false),
        disabled = false,
        expanded = $bindable(false),
        onclick,
        anchorName = null,

        href,
        target = null,
        current,
        ...restProps
    }: LzButtonProps = $props();

    let isKeyboardActive = $state(false);
    let isLink = $derived(Boolean(href));
    let isToggle = $derived(variant === "toggle" && !isLink);
    let isExpander = $derived(variant === "toggle" && expanded !== undefined);

    // const classesRaw = $derived(className)
    let classes = $derived(formatClasses("lz-button", className));
    let overridesFmt = $derived(overrides?.filter(Boolean).join(" "));
</script>

<!--
    Surface is treated as the main visible object.
    <a> or <button> are for native element features.
-->
{#snippet surface()}
    <span
        class="surface"
        data-color={color}
        data-size={size}
        data-shape={shape}
        data-overrides={overridesFmt}
    >
        <span class="label">
            {#if typeof label === "string"}
                {label}
            {:else}
                {@render children?.()}
            {/if}
        </span>
    </span>
{/snippet}

<!--
    We're using an if statement instead of svelte:element for determining the root tag.
    Keeps the structure cleaner than inside each attr.
 -->
{#if isLink}
    <a
        class={classes}
        {id}
        aria-label={ariaLabel}
        aria-disabled={disabled ? "true" : undefined}
        {href}
        {target}
        aria-current={current ? current : undefined}
        onclick={null}
        {...restProps}>{@render surface()}</a
    >
{:else}
    <button
        class={classes}
        {id}
        aria-label={ariaLabel ? ariaLabel : null}
        {type}
        {name}
        data-toggle={isToggle ? "" : null}
        aria-pressed={isToggle && !isExpander ? pressed : undefined}
        aria-expanded={isExpander ? expanded : undefined}
        data-active={!isToggle && isKeyboardActive ? "" : null}
        onclick={null}
        onkeydown={null}
        onkeyup={null}
        style={anchorName ? `anchor-name: ${anchorName}` : null}
        {...restProps}>{@render surface()}</button
    >
{/if}

<style>
    @layer lz-ui-reset, base, size, shape, color, state;

    @layer lz-ui-reset {
        .lz-button {
            all: unset;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            flex-shrink: 0;
            box-sizing: border-box;
            isolation: isolate;
            inline-size: fit-content;
            block-size: fit-content;
            background: transparent;
            color: inherit;
            border: none;
            box-shadow: none;
            line-height: 1;
            flex-direction: row;
            vertical-align: middle;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;

            &:after {
                content: "";
                position: absolute;
                height: 100%;
                width: 100%;
                min-height: var(--lz-touch-target-size);
                min-width: var(--lz-touch-target-size);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            & .surface {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                line-height: 1;
                position: relative;
                overflow: hidden;
                isolation: isolate;
                inline-size: fit-content;
                block-size: fit-content;
                vertical-align: middle;
                flex-shrink: 0;

                & .label {
                    position: relative;
                    pointer-events: none;
                    display: inline-flex;
                    align-items: center;
                    z-index: 3;
                    line-height: 1;
                    transform: translateY(var(--lz-font-offset, 0px));
                }
            }
        }
    }

    @layer base {
        .lz-button .surface {
            &:before {
                content: "";
                position: absolute;
                inset: 0;
                background: currentColor;
                z-index: -1;
                border-radius: inherit;
                opacity: 0;
                transition: opacity var(--lz-motion-duration-short1) ease;
            }

            &:has(:global(.lz-icon)) :global(svg) {
                flex-shrink: 0;
                height: var(--lz-typography-icon-size, 20px);
                width: var(--lz-typography-icon-size, 20px);
            }
        }
    }

    @layer size {
        .lz-button .surface {
            --lz-typography-icon-size: 1.25rem;
            --lz-button-outline-width: 1px;
            padding-inline: 0;

            & .label {
                font-family: var(--lz-typography-typeface-plain);
                font-size: var(--lz-typescale-label-l-font-size);
                letter-spacing: var(--lz-typescale-label-l-font-tracking);
                font-weight: var(--lz-typescale-label-l-font-weight);
                font-variation-settings: var(--lz-typescale-label-l-font-wght);
            }

            &[data-size="x-small"] {
                height: calc(2rem + var(--lz-density-global, 0px));
                min-width: 2rem;
                gap: var(--lz-spacing-space50);

                &:has(.label) {
                    padding-inline: var(--lz-spacing-space150);
                }
            }

            &[data-size="small"] {
                height: calc(2.5rem + var(--lz-density-global, 0px));
                min-width: 2.5rem;
                gap: var(--lz-spacing-space50);

                &:has(.label) {
                    padding-inline: var(--lz-spacing-space150);
                }
            }

            &[data-size="medium"] {
                height: calc(3.5rem + var(--lz-density-global, 0px));
                min-width: 3.5rem;
                gap: var(--lz-spacing-space100);

                --lz-typography-icon-size: 1.5rem;

                &:has(.label) {
                    padding-inline: var(--lz-spacing-space300);

                    & .label {
                        font-size: var(--lz-typescale-title-m-font-size);
                        letter-spacing: var(
                            --lz-typescale-title-m-font-tracking
                        );
                        font-weight: var(--lz-typescale-title-m-font-weight);
                        font-variation-settings: var(
                            --lz-typescale-title-m-font-wght
                        );
                    }
                }
            }

            &[data-size="large"] {
                height: calc(6rem + var(--lz-density-global, 0px));
                min-width: 6rem;
                gap: var(--lz-spacing-space150);

                --lz-typography-icon-size: 2rem;
                --lz-button-outline-width: 2px;

                &:has(.label) {
                    padding-inline: var(--lz-spacing-space600);

                    & .label {
                        font-size: var(--lz-typescale-headline-s-font-size);
                        letter-spacing: var(
                            --lz-typescale-headline-s-font-tracking
                        );
                        font-weight: var(--lz-typescale-headline-s-font-weight);
                        font-variation-settings: var(
                            --lz-typescale-headline-s-font-wght
                        );
                    }
                }
            }

            &[data-size="x-large"] {
                height: calc(8.5rem + var(--lz-density-global, 0px));
                min-width: 8.5rem;
                gap: var(--lz-spacing-space150);

                --lz-typography-icon-size: 2.5rem;
                --lz-button-outline-width: 3px;

                &:has(.label) {
                    padding-inline: var(--lz-spacing-space800);

                    & .label {
                        font-size: var(--lz-typescale-headline-l-font-size);
                        letter-spacing: var(
                            --lz-typescale-headline-l-font-tracking
                        );
                        font-weight: var(--lz-typescale-headline-l-font-weight);
                        font-variation-settings: var(
                            --lz-typescale-headline-l-font-wght
                        );
                    }
                }
            }

            &[data-overrides~="brand-font"] {
                font-family: var(--lz-typography-typeface-brand);
            }
        }
    }

    @layer shape {
        .lz-button .surface {
            &[data-shape="round"] {
                border-radius: var(--lz-shape-corner-radius-full);
            }

            /* Square button corner radius scales with size */
            &[data-shape="square"] {
                &[data-size="x-small"],
                &[data-size="small"] {
                    border-radius: var(--lzshape-corner-radius-md);
                }

                &[data-size="medium"] {
                    border-radius: var(--lz-shape-corner-radius-lg);
                }

                &[data-size="large"],
                &[data-size="x-large"] {
                    border-radius: var(--lz-shape-corner-radius-xl);
                }
            }
        }
    }

    @layer color {
        .lz-button .surface {
            /*
                Standard variants
            */
            &[data-color="filled"] {
                background: var(--lz-button-surface-filled-bg);
                color: var(--lz-button-surface-filled-fg);
            }

            &[data-color="tonal"] {
                background: var(--lz-button-surface-tonal-bg);
                color: var(--lz-button-surface-tonal-fg);
            }

            &[data-color="elevated"] {
                background: var(--lz-button-surface-elevated-bg);
                color: var(--lz-button-surface-elevated-fg);
                box-shadow: var(--lz-elevation-1);
            }

            &[data-color="outlined"] {
                background: transparent;
                color: var(--lz-button-surface-outlined-fg);
                /*
                    Using inset shadow to avoid layout shift
                */
                box-shadow: inset 0 0 0 var(--lz-button-outline-width)
                    var(--lz-button-surface-outlined-bg);
            }

            &[data-color="text"] {
                background: transparent;
                color: var(--lz-button-surface-text-fg);
            }
        }

        /*
                Toggle variants
            */
        .lz-button[aria-pressed="false"] .surface[data-color="filled"],
        .lz-button[aria-expanded="false"] .surface[data-color="filled"],
        .lz-button[aria-current="false"] .surface[data-color="filled"] {
            background: var(--lz-surface-container);
            color: var(--lz-on-surface-variant);
        }

        .lz-button[aria-pressed="true"],
        .lz-button[aria-expanded="true"] {
            .surface[data-color="tonal"] {
                background: var(--lz-secondary);
                color: var(--lz-on-secondary);
            }

            .surface[data-color="elevated"] {
                background: var(--lz-primary);
                color: var(--lz-on-primary);
            }

            .surface[data-color="outlined"] {
                background: var(--lz-on-surface);
                box-shadow: none;
                color: var(--lz-surface);
            }

            .surface[data-color="text"] {
                color: var(--lz-primary);

                &:before {
                    opacity: var(--lz-opacity-press);
                }
            }
        }
    }

    @layer state {
        .lz-button .surface {
            position: relative;
            transition:
                background-color var(--lz-motion-duration-short1) ease,
                color var(--lz-motion-duration-short1) ease,
                box-shadow var(--lz-motion-duration-short1) ease;

            &:not([data-color="elevated"]) {
                /* reset other buttons */
                box-shadow: var(--lz-elevation-0);
            }

            &:before {
                /* using :before as state layer */
                transition:
                    color var(--lz-motion-duration-short1) ease,
                    transform var(--lz-motion-duration-short1) ease,
                    opacity var(--lz-motion-duration-short1) ease;
            }
        }

        .lz-button:not(:disabled, [aria-disabled="true"]) {
            /* Hover */
            @media (hover: hover) {
                &:not(
                        :active,
                        [data-active],
                        [aria-current="true"],
                        [aria-current="page"]
                    ):hover
                    .surface {
                    &:not(
                        [data-color="text"],
                        [data-color="outlined"],
                        [data-color="elevated"]
                    ) {
                        box-shadow: var(--lz-elevation-1);
                    }

                    &[data-color="elevated"] {
                        box-shadow: var(--lz-elevation-2);
                    }

                    &:before {
                        opacity: var(--lz-opacity-hover);
                    }
                }
            }

            /* Focus */
            &:focus-visible .surface {
                outline: 3px solid var(--lz-color-primary);
                outline-offset: 2px;

                &:before {
                    opacity: var(--lz-opacity-focus);
                }
            }

            /* Active */
            &:active,
            &[data-active] {
                & .surface {
                    &:not([data-color="elevated"]) {
                        box-shadow: var(--lz-elevation-0);
                    }
                    &[data-color="elevated"] {
                        box-shadow: var(--lz-elevation-1);
                    }

                    &:before {
                        opacity: var(--lz-opacity-press);
                    }
                }
            }

            /* Toggle buttons */
            &[aria-pressed="true"],
            &[aria-expanded="true"] {
                & .surface:before {
                    opacity: var(--lz-opacity-press);
                }
            }
        }
    }
</style>
