import type { Component } from "svelte";

export type LzPageGroup = "Buttons" | "Navigation";

export interface LzPageMeta {
  label: string;
  group?: LzPageGroup;
  isOverview?: boolean;
  order?: number; /* order within group */
  icon?: Component | null;
  activeIcon?: Component | null;
}

export interface LzPage extends LzPageMeta {
  path: string;
}

export interface LzNavigationNode {
  page: LzPage;
  children?: LzNavigationNode[];
}
