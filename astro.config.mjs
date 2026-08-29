// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { siteConfig } from "./config/site.config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@config": path.resolve(__dirname, "config"),
        "@utils": path.resolve(__dirname, "utils"),
        "@components": path.resolve(__dirname, "src/components"),
        "@content": path.resolve(__dirname, "src/content"),
        "@lib": path.resolve(__dirname, "src/lib"),
      },
    },
  },
});
