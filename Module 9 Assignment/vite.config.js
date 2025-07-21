import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  plugins: [react()], // Enable React plugin for Vite
  server: {
    port: 3001, // Development server port
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Backend server URL
        changeOrigin: true, // Modify the origin header to match the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix before forwarding the request
      },
    },
  },
});
