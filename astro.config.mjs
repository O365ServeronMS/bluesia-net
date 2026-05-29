import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://bluesia.net",
  output: "static",

  vite: {
    cacheDir: ".astro/vite-cache",
  },

  adapter: cloudflare()
});