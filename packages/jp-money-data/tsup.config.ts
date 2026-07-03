import { defineConfig } from 'tsup'

export default defineConfig({
  // index（バレル）+ 各データセット（サブパス exports 用に個別エントリ）
  entry: ['src/index.ts', 'src/generated/*.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  outDir: 'dist',
})
