import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    build: {
        commonjsOptions: { include: [] },
    },
    optimizeDeps: {
        disabled: false,
    },
})
