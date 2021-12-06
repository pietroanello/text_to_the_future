import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const base = resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      { find: '@context', replacement: base + '/context' },
      { find: '@hooks', replacement: base + '/hooks' },
      { find: '@components', replacement: base + '/components' },
      { find: '@utils', replacement: base + '/utils' },
    ],
  },
})
