/*
  Global types and helper functions
*/
import type { AriaRole } from "svelte/elements";

// Standard shared component props.
export interface LzProps {
  className?: string | null;
  id?: string | null;
  ariaLabel?: string | null;
  role?: AriaRole | null;
  testId?: string | null;
}

// Concatenate and filter class names
export function filterClasses(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
