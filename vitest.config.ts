import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['solutions/**/*.test.ts'],
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json',
    },
  },
  resolve: {
    alias: {
      '@challenges': path.resolve(__dirname, './original-type-challenges/questions'),
      '@solutions': path.resolve(__dirname, './solutions'),
      '@utils': path.resolve(__dirname, './utils'),
      '@type-challenges/utils': path.resolve(__dirname, './original-type-challenges/utils'),
    },
  },
})