import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 3002,
    proxy: {
      "/api/gateway": {
        target:
          process.env.VITE_API_URL ??
          "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gateway/, ""),
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Wafrivet Herd',
        short_name: 'Herd',
        description: 'NFC-powered animal health layer for Wafrivet',
        theme_color: '#2D4D31',
        background_color: '#F9FAFB',
        display: 'standalone',
        icons: [
          {
            src: '/logo-mark.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: '/logo-mark.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
      devOptions: {
        enabled: true
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
