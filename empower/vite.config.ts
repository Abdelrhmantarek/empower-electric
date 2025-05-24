import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: {
        'process.env.REACT_APP_STRAPI_API_URL': JSON.stringify(env.REACT_APP_STRAPI_API_URL),
        'process.env.REACT_APP_STRAPI_API_TOKEN': JSON.stringify(env.REACT_APP_STRAPI_API_TOKEN),
      },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    
  };
});
