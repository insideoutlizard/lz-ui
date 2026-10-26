import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [
      sveltekit({
        compilerOptions: {
          // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
          runes: ({ filename }) =>
            filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
          /*
              Custom hash prefeix, ignored in dev so hot-reloading works
            */
          cssHash: isBuild
            ? ({ hash, filename, css }) => `lz-ui-${hash(filename ?? css)}`
            : undefined,
        },
        adapter: adapter(),
      }),
      Icons({
        compiler: "svelte",
        autoInstall: true,
      }),
    ],
  };
});
