<script lang="ts" module>
    export type LzColorScheme = "light" | "dark" | "system";

    const VALID_SCHEMES = new Set<string>(["light", "dark", "system"]);

    class ThemeSwitcher {
        private isUserTriggered = $state(false);
        colorScheme = $state<LzColorScheme>("system");
        systemDark = $state(false);

        constructor() {
            if (typeof window === "undefined") return;

            const mediaQuery = window.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            this.systemDark = mediaQuery.matches;

            mediaQuery.addEventListener(
                "change",
                (e) => (this.systemDark = e.matches),
            );

            const storedTheme = localStorage.getItem("color-scheme");
            if (storedTheme && VALID_SCHEMES.has(storedTheme)) {
                this.colorScheme = storedTheme as LzColorScheme;
            } else {
                this.colorScheme = "system";
            }
            this.syncDOM();
        }

        get activeTheme(): "light" | "dark" {
            return this.colorScheme === "system"
                ? this.systemDark
                    ? "dark"
                    : "light"
                : this.colorScheme;
        }

        nextTheme = () => {
            this.isUserTriggered = true;
            if (this.activeTheme === "light") {
                this.colorScheme = "dark";
            } else {
                this.colorScheme = "light";
            }

            localStorage.setItem("color-scheme", this.colorScheme);
            this.syncDOM();
        };

        private syncDOM() {
            if (typeof document === "undefined") return;
            const root = document.documentElement;

            if (this.isUserTriggered) {
                root.classList.add("theme-change");
            } else {
                root.classList.add("no-transitions");
            }

            root.setAttribute("data-color-scheme", this.activeTheme);
            root.style.colorScheme = this.activeTheme;

            if (this.isUserTriggered) {
                const timer = setTimeout(() => {
                    root.classList.remove("theme-change");
                    this.isUserTriggered = false;
                }, 350);
                return () => clearTimeout(timer);
            } else {
                const rafl = requestAnimationFrame(() => {
                    root.classList.remove("no-transitions");
                });
                return () => cancelAnimationFrame(rafl);
            }
        }
    }

    export const theme = new ThemeSwitcher();
</script>

<script lang="ts">
    import {
        LzButton,
        type LzButtonColor,
        type LzButtonSize,
    } from "#lib/components/index.ts";
    import DayIcon from "~icons/material-symbols/light-mode-sharp";
    import NightIcon from "~icons/material-symbols/dark-mode-outline-sharp";

    interface Props {
        color?: LzButtonColor;
        size?: LzButtonSize;
    }

    let { color = "outlined", size = "small" }: Props = $props();
</script>

<LzButton
    ariaLabel="Change theme"
    {color}
    {size}
    iconLeading={NightIcon}
    iconToggled={DayIcon}
    pressed={theme.activeTheme === "dark"}
    onclick={theme.nextTheme}
/>

<style>
    :global(.theme-change),
    :global(.theme-change *) {
        transition-property:
            background-color, color, border, outline, border-color;
        transition-duration: 350ms, 350ms, 0ms, 0ms, 0ms;
        transition-timing-function: ease;
    }

    :global(.theme-change .lz-card) {
        transition: border 0ms none;
    }

    :global(.no-transitions) {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
    }
</style>
