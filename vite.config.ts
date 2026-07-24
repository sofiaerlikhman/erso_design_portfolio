import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built app works from any subpath —
// GitHub Pages project sites (username.github.io/repo-name/), a custom
// domain, or a local `vite preview` all resolve assets correctly.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
