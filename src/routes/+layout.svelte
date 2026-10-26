<script lang="ts">
    import "./resets.css";
    import "./layout.css";
    import "./color.css";

    import "#lib/styles/index.css";
    import { page } from "$app/state";
    import { fly, fade } from "svelte/transition";
    import { cubicIn, cubicOut } from "svelte/easing";

    import BugIcon from "~icons/material-symbols/bug-report-outline-sharp";
    import BugIconFill from "~icons/material-symbols/bug-report-sharp";

    import { LzButton } from "#lib";

    const pages = import.meta.glob("/src/routes/**/+page.svelte", {
        eager: true,
    });

    const navItems = Object.entries(pages)
        .map(([filePath, module]: [string, any]) => {
            let path = filePath
                .replace("/src/routes", "")
                .replace("/+page.svelte", "");
            if (path === "") path = "/";

            // Use exported title, or fallback to file name
            const title =
                module.title ||
                path.split("/").pop()?.replace(/-/g, " ") ||
                "Home";
            const icon = module.icon ?? BugIcon;
            const activeIcon = module.activeIcon ?? BugIconFill;
            const order = module.order ?? 99; // Manual sorting priority

            return { path, title, icon, activeIcon, order };
        })
        .sort((a, b) => a.order - b.order);

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);
</script>

<aside class="dev-nav">
    <nav class="rail-links">
        <ul>
            {#each navItems as page}
                {@const isCurrent = currentPath === page?.path}

                <li>
                    <LzButton
                        size="x-small"
                        color={isCurrent ? "tonal" : "text"}
                        href={page?.path}
                        ariaLabel={page?.title}
                        iconLeading={page?.icon}
                        iconToggled={page?.activeIcon}
                        current={isCurrent}
                    ></LzButton>
                    <span class="rail-link-label">{page?.title}</span>
                </li>
            {/each}
        </ul>
    </nav>
</aside>

{#key currentPath}
    <main
        id="content"
        in:fly={{ y: 12, duration: 200, delay: 48, easing: cubicOut }}
        out:fade={{ duration: 150, easing: cubicIn }}
    >
        {@render children()}
    </main>
{/key}

<style>
    :root {
        --rail-width: 6rem;
    }

    #content {
        margin-left: var(--rail-width);
        box-sizing: border-box;
        width: calc(100% - var(--rail-width));
    }

    .dev-nav {
        display: flex;
        flex-direction: column;
        gap: var(--lz-spacing-space100);
        width: var(--rail-width);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        padding-top: 2.75rem;

        background: var(--lz-color-surface-container);
        box-shadow: var(--lz-elevation-0);

        .rail-links ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: var(--lz-spacing-space50);
            width: 100%;

            & li {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--lz-spacing-space100);

                :global(.lz-button .surface) {
                    height: 2rem;
                    width: 3.5rem;
                }

                & .rail-link-label {
                    font-family: var(--lz-typography-typeface-plain);
                    font-size: var(--lz-typescale-label-m-font-size);
                    letter-spacing: var(--lz-typescale-label-m-font-tracking);
                    font-weight: var(--lz-typescale-label-m-font-weight);
                    font-variation-settings: var(
                        --lz-typescale-label-m-font-wght
                    );
                }
            }
        }
    }
</style>
