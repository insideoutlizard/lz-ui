import type { Component } from "svelte";

export type LzPageGroup = "Buttons" | "Navigation";

export interface LzPageMeta {
  label: string;
  group?: LzPageGroup;
  order?: number; /* order within group */
  icon?: Component | null;
  activeIcon?: Component | null;
}

export interface LzNavItem {
  path: string;
  label: string;
  icon?: any;
  activeIcon?: any;
  order?: number;
  group?: LzPageGroup;
  children?: LzNavItem[];
}
