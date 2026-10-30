<script lang="ts" module>
    import type { LzNavItem, LzPageMeta } from "./types";

    const pages = import.meta.glob("../../../routes/**/+page.svelte", {
        eager: true,
    });

    const navItems: LzNavItem[] = Object.entries(pages).map(
        ([filePath, module]: [string, any]) => {
            let path = filePath
                .replace(/^.*\/routes/, "")
                .replace("/+page.svelte", "");
            if (path === "") path = "/";

            const meta: LzPageMeta = module.meta || {
                label: path.split("/").pop()?.replace(/-/g, " ") || "Index",
            };

            return {
                path,
                label: meta.label,
                icon: meta.icon ?? null,
                activeIcon: meta.activeIcon ?? null,
                order: meta.order ?? 99,
                group: meta.group ?? undefined,
            };
        },
    );

    navItems.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    export { navItems };
</script>
