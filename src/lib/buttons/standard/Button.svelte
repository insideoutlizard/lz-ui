<script lang="ts" module>
    import type { LzProps } from "#lib/types.ts";

    export interface ButtonBase extends Omit<LzProps, "role"> {}
</script>

<script lang="ts">
    import "./button.css";
</script>

<button type="button">Test label</button>

<style>
</style>
