import type { AriaRole } from "svelte/elements";

// Standard shared component props.
export interface LzProps {
  className?: string | null;
  id?: string | null;
  ariaLabel?: string | null;
  role?: AriaRole | null;
  testId?: string | null;
  tabindex?: number | null;
  anchorName?: string | null;
}
