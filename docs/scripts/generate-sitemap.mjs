// data/ の id と静的ルートから public/sitemap.xml を生成する。
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://jp-money-data.com'
const here = dirname(fileURLToPath(import.meta.url))
const dataDir = join(here, '..', '..', 'data')

function datasetIds() {
  const ids = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p)
      else if (name.endsWith('.json')) ids.push(name.replace(/\.json$/, ''))
    }
  }
  walk(dataDir)
  return ids.sort()
}

const staticPaths = [
  '/',
  '/datasets/',
  '/docs/getting-started/',
  '/docs/schema/',
  '/docs/license/',
  '/changelog/',
  '/about/',
]
const paths = [...staticPaths, ...datasetIds().map((id) => `/datasets/${id}/`)]

const body = paths
  .map((p) => `  <url><loc>${SITE}${p}</loc></url>`)
  .join('\n')
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
writeFileSync(join(here, '..', 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${paths.length} URLs`)
