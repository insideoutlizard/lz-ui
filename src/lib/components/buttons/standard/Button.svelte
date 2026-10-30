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
        | "brand-font"
        | "no-elevation"
        | "blank-tag";

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
        rel?: never;
        current?: never;
    }

    export interface LzButtonIconOnlyProps extends LzButtonBaseProps {
        ariaLabel: string;
        href?: never;
        target?: never;
        rel?: never;
        current?: never;
    }

    export interface LzButtonLinkProps extends LzButtonBaseProps {
        href: string;
        target?: string | null;
        rel?: string | null;
        current?: HTMLAttributes<HTMLAnchorElement>["aria-current"];
    }

    export type LzButtonProps =
        LzButtonStandardProps | LzButtonIconOnlyProps | LzButtonLinkProps;

    export interface LzToggleConfig {
        variant: string | "default";
        pressed: boolean;
        expanded?: boolean;
        onToggle: (nextState: boolean) => void;
        onclick?: (e: MouseEvent | KeyboardEvent) => void;
    }

    export interface LzKeyboardHandlerOptions {
        disabled: boolean;
        isToggle: boolean;
        onActivate: (e: KeyboardEvent) => void;
        setKeyboardActive: (active: boolean) => void;
    }

    export function handleKeyDown(
        e: KeyboardEvent,
        {
            disabled,
            isToggle,
            onActivate,
            setKeyboardActive,
        }: LzKeyboardHandlerOptions,
    ) {
        if (disabled || (e.key !== "Enter" && e.key !== " ")) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setKeyboardActive(true);
            if (isToggle) {
                onActivate(e);
            }
        }
    }

    export function handleKeyUp(
        e: KeyboardEvent,
        {
            disabled,
            isToggle,
            onActivate,
            setKeyboardActive,
        }: LzKeyboardHandlerOptions,
    ) {
        if (disabled || (e.key !== "Enter" && e.key !== " ")) return;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isToggle) {
                onActivate(e);
            }
            setKeyboardActive(false);
        }
    }

    export interface LzHashScrollOptions {
        href?: string;
        onclick?: (e: MouseEvent) => void;
        headerOffset?: number;
    }

    export function handleHashScroll(
        e: MouseEvent,
        { href, onclick, headerOffset }: LzHashScrollOptions,
    ) {
        if (onclick) onclick(e);
        if (e.defaultPrevented || !href?.startsWith("#") || href.length <= 1)
            return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            const elPos = targetElement.getBoundingClientRect().top;
            const offsetPos = elPos + window.scrollY - (headerOffset ?? 0);

            window.scrollTo({
                top: offsetPos,
                behavior: "smooth",
            });
        }
    }

    export const executeButton = (
        e: MouseEvent | KeyboardEvent,
        config: LzToggleConfig,
    ): boolean => {
        if (config.variant === "toggle") {
            const currentState = config.expanded ?? config.pressed;
            config.onToggle(!currentState);
        }

        if (config.onclick) {
            config.onclick(e);
        }

        return true;
    };
</script>

<script lang="ts">
    import "./button.css";
    import { formatClasses } from "#lib/util/types.ts";
    import { LzIcon } from "#lib/util/index.ts";

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
        rel = null,
        current,
        ...restProps
    }: LzButtonProps = $props();

    let isKeyboardActive = $state(false);
    let isLink = $derived(Boolean(href));
    let isToggle = $derived(variant === "toggle" && !isLink);
    let isExpander = $derived(variant === "toggle" && expanded !== undefined);

    let isToggled = $derived(Boolean(pressed || expanded || current));

    // const classesRaw = $derived(className)
    let classes = $derived(formatClasses("lz-button", className));
    let overridesFmt = $derived(overrides?.filter(Boolean).join(" "));

    const handleActivate = (e: MouseEvent | KeyboardEvent) => {
        executeButton(e, {
            variant,
            pressed,
            expanded,
            onToggle: (next) => {
                if (isExpander) {
                    expanded = next;
                } else {
                    pressed = next;
                }
            },
            onclick,
        });
    };

    const onKeyDown = (e: KeyboardEvent) =>
        handleKeyDown(e, {
            disabled,
            isToggle,
            onActivate: handleActivate,
            setKeyboardActive: (v) => (isKeyboardActive = v),
        });

    const onKeyUp = (e: KeyboardEvent) =>
        handleKeyUp(e, {
            disabled,
            isToggle,
            onActivate: handleActivate,
            setKeyboardActive: (v) => (isKeyboardActive = v),
        });

    const onHashScroll = (e: MouseEvent) =>
        handleHashScroll(e, { href, onclick });
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
        {#if IconLeading && IconToggled}
            <LzIcon
                active={isToggled}
                inactiveIcon={IconLeading}
                activeIcon={IconToggled}
            />
        {:else if IconLeading}
            <LzIcon inactiveIcon={IconLeading} />
        {/if}

        {#if label || children}
            <span class="label">
                {#if typeof label === "string"}
                    {label}
                {:else}
                    {@render children?.()}
                {/if}
            </span>
        {/if}

        {#if IconTrailing}
            <LzIcon inactiveIcon={IconTrailing} />
        {/if}
    </span>
{/snippet}

<!--
    We're using an if statement instead of svelte:element for determining the root tag.
    Keeps the structure cleaner than inside each attr.
 -->

{#if overrides?.includes("blank-tag")}
    <div
        class={classes}
        {id}
        aria-label={ariaLabel ? ariaLabel : null}
        {...restProps}
    >
        {@render surface()}
    </div>
{:else if isLink}
    <a
        class={classes}
        {id}
        aria-label={ariaLabel}
        aria-disabled={disabled ? "true" : undefined}
        {href}
        {target}
        {rel}
        aria-current={current ? current : undefined}
        onclick={onHashScroll}
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
        onclick={handleActivate}
        onkeydown={onKeyDown}
        onkeyup={onKeyUp}
        style={anchorName ? `anchor-name: ${anchorName}` : null}
        {...restProps}>{@render surface()}</button
    >
{/if}

<style>
    @layer lz-ui-reset, base, size, shape, color, state, overrides;

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
            /* This is set up to fall back to small specs */
            --lz-typography-icon-size: var(--lz-button-small-icon-size);
            --lz-button-outline-width: var(--lz-button-small-outline-width);
            /* Zero inline padding assumes icon-only by default */
            padding-inline: 0;

            & .label {
                font: var(--lz-button-small-font);
                letter-spacing: var(--lz-button-small-letter-spacing);
                font-variation-settings: var(
                    --lz-button-small-font-variation-settings
                );
            }

            &[data-size="x-small"] {
                height: calc(
                    var(--lz-button-x-small-height) +
                        var(--lz-density-global, 0px)
                );
                min-width: calc(
                    var(--lz-button-x-small-min-width) +
                        var(--lz-density-global, 0px)
                );
                gap: var(--lz-button-x-small-gap);

                /* We're going to put the actual label styles outside the :has(),
                it can be unreliable */
                & .label {
                    font: var(--lz-button-x-small-font);
                    letter-spacing: var(--lz-button-x-small-letter-spacing);
                    font-variation-settings: var(
                        --lz-button-x-small-font-variation-settings
                    );
                }

                &:has(.label) {
                    padding-inline: var(--lz-button-x-small-padding-inline);
                }
            }

            &[data-size="small"] {
                height: calc(
                    var(--lz-button-small-height) +
                        var(--lz-density-global, 0px)
                );
                min-width: calc(
                    var(--lz-button-small-min-width) +
                        var(--lz-density-global, 0px)
                );
                gap: var(--lz-button-small-gap);

                & .label {
                    font: var(--lz-button-small-font);
                    letter-spacing: var(--lz-button-small-letter-spacing);
                    font-variation-settings: var(
                        --lz-button-small-font-variation-settings
                    );
                }

                &:has(.label) {
                    padding-inline: var(--lz-button-small-padding-inline);
                }
            }

            &[data-size="medium"] {
                height: calc(
                    var(--lz-button-medium-height) +
                        var(--lz-density-global, 0px)
                );
                min-width: calc(
                    var(--lz-button-medium-min-width) +
                        var(--lz-density-global, 0px)
                );
                gap: var(--lz-button-medium-gap);

                --lz-typography-icon-size: 1.5rem;

                & .label {
                    font: var(--lz-button-medium-font);
                    letter-spacing: var(--lz-button-medium-letter-spacing);
                    font-variation-settings: var(
                        --lz-button-medium-font-variation-settings
                    );
                }

                &:has(.label) {
                    padding-inline: var(--lz-button-medium-padding-inline);
                }
            }

            &[data-size="large"] {
                height: calc(
                    var(--lz-button-large-height) +
                        var(--lz-density-global, 0px)
                );
                min-width: calc(
                    var(--lz-button-large-min-width) +
                        var(--lz-density-global, 0px)
                );
                gap: var(--lz-button-large-gap);

                --lz-typography-icon-size: var(--lz-button-large-icon-size);
                --lz-button-outline-width: var(--lz-button-large-outline-width);

                & .label {
                    font: var(--lz-button-large-font);
                    letter-spacing: var(--lz-button-large-letter-spacing);
                    font-variation-settings: var(
                        --lz-button-large-font-variation-settings
                    );
                }

                &:has(.label) {
                    padding-inline: var(--lz-button-large-padding-inline);
                }
            }

            &[data-size="x-large"] {
                height: calc(
                    var(--lz-button-x-large-height) +
                        var(--lz-density-global, 0px)
                );
                min-width: calc(
                    var(--lz-button-x-large-min-width) +
                        var(--lz-density-global, 0px)
                );
                gap: var(--lz-button-x-large-gap);

                --lz-typography-icon-size: var(--lz-button-x-large-icon-size);
                --lz-button-outline-width: var(
                    --lz-button-x-large-outline-width
                );

                & .label {
                    font: var(--lz-button-x-large-font);
                    letter-spacing: var(--lz-button-x-large-letter-spacing);
                    font-variation-settings: var(
                        --lz-button-x-large-font-variation-settings
                    );
                }

                &:has(.label) {
                    padding-inline: var(--lz-button-x-large-padding-inline);
                }
            }

            &[data-overrides~="brand-font"] {
                font-family: var(--lz-typography-typeface-brand);
                --lz-font-offset: var(--lz-button-font-offset);
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
                &[data-size="x-small"] {
                    border-radius: var(--lz-button-x-small-shape);
                }
                &[data-size="small"] {
                    border-radius: var(--lz-button-small-shape);
                }
                &[data-size="medium"] {
                    border-radius: var(--lz-button-medium-shape);
                }
                &[data-size="large"] {
                    border-radius: var(--lz-button-large-shape);
                }
                &[data-size="x-large"] {
                    border-radius: var(--lz-button-x-large-shape);
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
            background: var(--lz-color-surface-container);
            color: var(--lz-color-on-surface-variant);
        }

        .lz-button[aria-pressed="true"],
        .lz-button[aria-expanded="true"] {
            .surface[data-color="tonal"] {
                background: var(--lz-color-secondary);
                color: var(--lz-color-on-secondary);
            }

            .surface[data-color="elevated"] {
                background: var(--lz-color-primary);
                color: var(--lz-color-on-primary);
            }

            .surface[data-color="outlined"] {
                background: var(--lz-color-inverse-surface);
                box-shadow: none;
                color: var(--lz-color-inverse-on-surface);
            }

            .surface[data-color="text"] {
                color: var(--lz-color-primary);

                &:before {
                    opacity: var(--lz-opacity-press);
                }
            }
        }
    }

    @layer state {
        .lz-button .surface {
            position: relative;
            transition-property: background-color, color, box-shadow;
            transition-duration: var(--lz-button-transition-duration);
            transition-timing-function: var(--lz-button-transition-easing);

            &:not([data-color="elevated"]) {
                /* reset other buttons */
                box-shadow: var(--lz-elevation-0);

                &[data-color="outlined"] {
                    box-shadow: inset 0 0 0 var(--lz-button-outline-width)
                        var(--lz-color-outline-variant);
                }
            }

            &:before {
                /* using :before as state layer */
                transition-property: color, opacity;
                transition-duration: var(--lz-button-transition-duration);
                transition-timing-function: var(--lz-button-transition-easing);
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
                        opacity: var(--lz-button-opacity-hover);
                    }
                }
            }

            /* Focus */
            &:focus-visible .surface {
                outline: var(--lz-button-focus-ring-width) solid
                    var(--lz-button-focus-ring-color);
                outline-offset: var(--lz-button-focus-ring-offset);

                &:before {
                    opacity: var(--lz-button-opacity-focus);
                }
            }

            /* Active */
            &:active,
            &[data-active] {
                & .surface {
                    &:not([data-color="elevated"]) {
                        box-shadow: var(--lz-elevation-0);

                        &[data-color="outlined"] {
                            box-shadow: inset 0 0 0
                                var(--lz-button-outline-width)
                                var(--lz-color-outline-variant);
                        }
                    }
                    &[data-color="elevated"] {
                        box-shadow: var(--lz-elevation-1);
                    }

                    &:before {
                        opacity: var(--lz-button-opacity-press);
                    }
                }
            }

            /* Toggle buttons */
            &[aria-pressed="true"],
            &[aria-expanded="true"] {
                & .surface:before {
                    opacity: var(--lz-button-opacity-press);
                }
            }
        }
    }

    @layer overrides {
        .lz-button .surface {
            &[data-overrides~="no-elevation"] {
                box-shadow: var(--lz-elevation-0);
            }
        }
    }
</style>
