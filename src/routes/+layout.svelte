<script lang="ts">
    import "./resets.css";
    import "./layout.css";
    import "./color.css";

    import "#lib/styles/index.css";
    import { page } from "$app/state";

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
            const order = module.order ?? 99; // Manual sorting priority

            return { path, title, order };
        })
        .sort((a, b) => a.order - b.order);

    let { children } = $props();
    let currentPath = $derived(page.url.pathname);
</script>

<header class="dev-nav">
    <nav>
        <ul>
            {#each navItems as page}
                <li>
                    <a href={page?.path}>{page?.title}</a>
                </li>
            {/each}
        </ul>
    </nav>
</header>
<main id="content">
    {@render children()}
</main>

<style>
    .dev-nav {
        display: flex;
    }
</style>
