import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'materialUIMachineOptions.js'),
      name: 'materialUIMachineOptions',
      formats: ['es'],
      fileName: 'materialUIMachineOptions.js',
    },
  },
})
