<!--
    Reference: https://m3.material.io/components/buttons/specs
-->
<script lang="ts" module>
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

    export interface ButtonBase extends Omit<LzProps, "role"> {}
</script>

<script lang="ts">
    import "./button.css";
    import { filterClasses } from "#lib/types.ts";

    let isKeyboardActive = $state(false);
    let isToggle = $derived("");
</script>

<!--
    Surface is treated as the main visible object.
    <a> or <button> are for native element features.
-->
{#snippet surface()}
    <span class="surface"> </span>
{/snippet}

<button type="button">{@render surface()}</button>

<style>
</style>
