import type { Component } from "svelte";

export type LzPageGroup = "Buttons" | "Navigation";

export interface LzPageMeta {
  label: string;
  group?: LzPageGroup;
  order?: number; /* order within group */
  icon?: Component | null;
  activeIcon?: Component | null;
}

export interface LzNavItem extends LzPageMeta {
  path: string;
}

export interface LzNavGroup {
  label: LzPageGroup;
  items: LzNavItem[];
}

export type LzSecondaryItem = LzNavItem | LzNavGroup;
