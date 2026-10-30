<script lang="ts" module>
    import type { LzNavItem } from "./components";

    const pages = import.meta.glob("../routes/**/+page.svelte", {
        eager: true,
    });

    const allItems: LzNavItem[] = Object.entries(pages).map(
        ([filePath, module]: [string, any]) => {
            let path = filePath
                .replace(/^.*\/routes/, "")
                .replace("/+page.svelte", "");
            if (path === "") path = "/";

            const label =
                module.label ||
                path.split("/").pop()?.replace(/-/g, " ") ||
                "Index page";
            const icon = module.icon ?? null;
            const activeIcon = module.activeIcon ?? null;
            const order = module.order ?? 99;

            return { path, label, icon, activeIcon, order };
        },
    );

    allItems.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    const navItems: LzNavItem[] = [];
    const itemMap = new Map<string, LzNavItem>();

    allItems.forEach((item) => {
        itemMap.set(item.path, { ...item, children: [] });
    });

    allItems.forEach((item) => {
        if (item.path === "/") {
            navItems.push(itemMap.get("/")!);
            return;
        }

        const segments = item.path.split("/").filter(Boolean);

        if (segments.length === 1) {
            const entry = itemMap.get(item.path)!;
            if (!navItems.includes(entry)) {
                navItems.push(entry);
            }
        } else {
            const parentPath = `/${segments[0]}`;
            const parent = itemMap.get(parentPath);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(itemMap.get(item.path)!);
            } else {
                navItems.push(itemMap.get(item.path)!);
            }
        }
    });

    navItems.forEach((item) => {
        if (item.children && item.children.length === 0) {
            delete item.children;
        } else if (item.children) {
            item.children.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        }
    });

    export { navItems };
</script>
