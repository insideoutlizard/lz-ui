<!--
    Reference: https://m3.material.io/components/buttons/specs
-->
<script lang="ts" module>
    import { type HTMLAttributes } from "svelte/elements";

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
        color?: LzButtonColor;
        variant?: LzButtonVariant;
        size?: LzButtonSize;
        shape?: LzButtonShape;
        overrides?: LzButtonOverride[] | null;

        label?: string;
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
    }: LzButtonProps = $props();

    let isKeyboardActive = $state(false);
    let isToggle = $derived("");

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
        {#if label}
            <span class="label">
                {label}
            </span>
        {/if}
    </span>
{/snippet}

<button type="button">{@render surface()}</button>

<style>
</style>
