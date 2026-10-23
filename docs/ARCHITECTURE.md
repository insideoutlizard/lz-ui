# Architecture

## CSS Variables

All CSS custom properties use the following naming convention:

```css
--{prefix}-{domain}-{name}
```

Examples:

```css
--lz-color-primary = oklch(0.5 0.16 300);
--lz-color-on-primary = oklch(1 0 0);
--lz-color-surface-container = oklch(from var(--lz-color-primary) 0.975 0.001 h);
--lz-spacing-space200 = 1rem;
--lz-motion-duration-short4 = 200ms;
```

Where practical, variable naming follows Material Design 3 terminology.

---

## Component Naming

All exported components use the `Lz` prefix.

Examples:

```ts
export { default as LzButton } from "./Button.svelte";
export { default as LzCard } from "./Card.svelte";
export { default as LzDialog } from "./Dialog.svelte";
```

This avoids naming collisions and provides a consistent public API.

---

## Component Structure

Components should remain self-contained whenever practical.

Typical structure:

```text
Button/
├─ Button.svelte
├─ Button.css
└─ types.ts
```

Standalone CSS files are used when component styles need to expose overridable CSS variables or avoid Svelte's style scoping.

---

## Svelte Structure

Components use both module and instance scripts.

The module script is used for public types and exports:

```svelte
<script lang="ts" module>
	export interface ButtonProps {
		disabled?: boolean;
	}
	
	// First element implicitly suggests it is the default value
	export type ButtonShape = "round" | "square";
	
	export function myCustomHandlerForKeyboardState(e: KeyboardEvent) {
		...
	}
</script>
```

The instance script is used for implementation details:

```svelte
<script lang="ts">
	import "./Button.css";

	let { disabled = false }: ButtonProps = $props();
	
	let LocalVariableFromState = $state(...);
</script>
```

Implementation details should remain in the instance script whenever they do not need to be exposed to consumers.

Examples:

- CSS imports
- Helper functions
- Internal state
- Derived values
- Event handling

---

## Styling

Components should prefer CSS custom properties over runtime styling.

Consumers should be able to customize appearance through CSS variables whenever possible.

Avoid exposing style-related props unless a CSS variable cannot reasonably solve the problem.

---

## Design Principles

- Material Design 3 is the primary design reference.
- Prefer composition over configuration.
- Prefer native Svelte patterns.
- Prefer CSS variables over runtime styling.
- Keep component APIs small and predictable.
