import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type {} from 'vite-react-ssg'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** リポジトリの data/ を走査して全データセット id を返す（動的ルート /datasets/:id の展開用）。 */
function datasetIds(): string[] {
  const root = join(process.cwd(), '..', 'data')
  const ids: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p)
      else if (name.endsWith('.json')) ids.push(name.replace(/\.json$/, ''))
    }
  }
  walk(root)
  return ids.sort()
}

export default defineConfig({
  plugins: [react()],
  // dev サーバーで docs/ の外（../data 同期は src 内に行うので通常不要だが保険）
  server: { fs: { allow: ['..'] } },
  ssgOptions: {
    // 各ルートを `<path>/index.html` で出力（Cloudflare Pages の末尾スラッシュURL対応）
    dirStyle: 'nested',
    includedRoutes(paths: string[]) {
      const ids = datasetIds()
      return paths.flatMap((path) =>
        path.includes(':id') ? ids.map((id) => `/datasets/${id}`) : path,
      )
    },
  },
})
