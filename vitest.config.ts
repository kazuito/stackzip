import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => ({
  test: {
    environment: "jsdom",
    env: loadEnv(mode, process.cwd(), ""),
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
}));
