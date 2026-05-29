import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bluesia.net",
  output: "static",
  vite: {
    cacheDir: ".astro/vite-cache",
  },
});
