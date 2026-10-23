import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
        // Replace svelte-* prefix with lz-* prefix for auto-generated class names
        cssHash: ({ hash, filename, css }) => `lz-ui-${hash(filename ?? css)}`,
      },
      adapter: adapter(),
    }),
  ],
});
