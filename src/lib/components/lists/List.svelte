<script lang="ts" module>
    import type { LzProps } from "#lib/types.ts";

    export interface LzListProps extends LzProps {
        leadingLabel?: string;
        items?: [label: string, href: string][];
    }
</script>

<script lang="ts">
    import { LzButton } from "../buttons";

    let {
        className = "",
        id = "",
        ariaLabel,
        role = "",

        leadingLabel = "Main item",
        items = [],
    }: LzListProps = $props();
</script>

<ul class="lz-list" data-expandable>
    <li class="leading-item">
        <LzButton color="text">{leadingLabel}</LzButton>
    </li>
    {#each items as item}
        <li>
            <a href={item[0]}>
                {item[1]}
            </a>
        </li>
    {/each}
</ul>
