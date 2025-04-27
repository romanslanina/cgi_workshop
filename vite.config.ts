/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const env = process.env.VITE_BUILD_FOR ?? null;

export default defineConfig(() => ({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './src/test/setup.ts',
  },
  plugins: [react(), tailwindcss()],
  base: env ? `/${env}/` : "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
