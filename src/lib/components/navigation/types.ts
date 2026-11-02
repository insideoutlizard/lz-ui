import type { Component } from "svelte";

export interface LzPageMeta {
  label: string;
  icon?: Component | null;
  activeIcon?: Component | null;
}

export interface LzPage extends LzPageMeta {
  path: string;
  groups: string[];
}

export interface LzNavigationNode {
  label: string;
  href?: string;
  icon?: Component | null;
  iconActive?: Component | null;
  children?: LzNavigationNode[];
}

export function buildTree(pages: LzPage[]): LzNavigationNode[] {
  const nodes: LzNavigationNode[] = [];

  for (const page of pages) {
    if (page.groups.length === 0) {
      nodes.push({
        label: page.label,
        href: page.path,
        icon: page.icon,
        iconActive: page.activeIcon,
      });

      continue;
    }

    let currentLevel = nodes;

    for (const group of page.groups) {
      let groupNode = currentLevel.find(
        (node) => node.href === undefined && node.label === group,
      );

      if (!groupNode) {
        groupNode = {
          label: group,
          children: [],
        };

        currentLevel.push(groupNode);
      }

      currentLevel = groupNode.children!;
    }

    currentLevel.push({
      label: page.label,
      href: page.path,
      icon: page.icon,
      iconActive: page.activeIcon,
    });
  }

  return nodes;
}

export function containsCurrentRoute(
  node: LzNavigationNode,
  currentPath: string,
): boolean {
  if (node.href === currentPath) {
    return true;
  }

  return (
    node.children?.some((child) => containsCurrentRoute(child, currentPath)) ??
    false
  );
}
