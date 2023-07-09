import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs-extra";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "generate-sitemap",
          writeBundle() {
            fs.copyFileSync("generateSitemap.js", "dist/generateSitemap.js");
            require("generateSitemap");
          },
        },
      ],
    },
  },
});
