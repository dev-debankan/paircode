import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const monacoEditorApi = fileURLToPath(
  new URL('./node_modules/monaco-editor/esm/vs/editor/editor.api.js', import.meta.url),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: [
      {
        find: 'monaco-editor/esm/vs/editor/editor.api.js',
        replacement: monacoEditorApi,
      },
    ],
  },
  build: {
    outDir: '../backend/public',
    emptyOutDir: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const monacoPath = '/node_modules/monaco-editor/esm/vs/'
          if (!id.includes(monacoPath)) return

          const [area, subarea, component] = id.split(monacoPath)[1].split('/')
          if (area === 'editor' && subarea === 'browser') {
            return component === 'widget' ? 'monaco-browser-widget' : 'monaco-browser-core'
          }
          if (area === 'editor' && subarea === 'common') {
            if (['cursor', 'viewModel'].includes(component)) {
              return `monaco-common-${component}`
            }
            return 'monaco-common-core'
          }
          if (area === 'editor' && subarea === 'contrib') {
            return 'monaco-contrib'
          }
          if (area === 'base' && ['browser', 'common'].includes(subarea)) {
            return `monaco-base-${subarea}`
          }
          return `monaco-${area}`
        },
      },
    },
  },
})
