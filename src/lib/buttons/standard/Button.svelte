<script lang="ts" module>
    import type { LzProps } from "#lib/types.ts";

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
