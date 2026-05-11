import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              vendor: ["react", "react-dom", "react-router-dom"],
              forms: ["react-hook-form", "zod", "@hookform/resolvers"],
            },
          },
        },
  },
}));
