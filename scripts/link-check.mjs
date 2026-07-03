// 月次: 全 sources[].url の HTTP 死活確認 + verifiedAt が 400 日超のデータセットを警告。
// 官公庁はURL変更が頻発するため（祝日CSVファイル名変更騒動の教訓・設計書§12）。
import { loadDatasets } from './lib/load-validate.mjs'

const STALE_DAYS = 400
const now = Date.now()

const entries = loadDatasets()
const urls = new Map() // url -> Set(relPath)
const stale = []

for (const { data, relPath } of entries) {
  const collect = (arr) => {
    for (const s of arr ?? []) {
      if (typeof s.url === 'string' && /^https?:\/\//.test(s.url)) {
        if (!urls.has(s.url)) urls.set(s.url, new Set())
        urls.get(s.url).add(relPath)
      }
    }
  }
  collect(data.meta?.sources)
  for (const sl of data.slices ?? []) {
    collect(sl.sources)
    if (sl.verifiedAt) {
      const ageDays = (now - Date.parse(sl.verifiedAt)) / 86_400_000
      if (ageDays > STALE_DAYS) stale.push(`${relPath} slice ${sl.effectiveFrom}: verifiedAt ${sl.verifiedAt}（${Math.round(ageDays)}日前）`)
    }
  }
}

let dead = 0
for (const [url, paths] of urls) {
  let ok = false
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000) })
      if (res.ok || res.status === 405) {
        ok = true
        break
      }
    } catch {
      // 次の method を試す
    }
  }
  if (ok) {
    console.log(`  ok  ${url}`)
  } else {
    console.error(`DEAD  ${url}  (${[...paths].join(', ')})`)
    dead++
  }
}

if (stale.length) {
  console.warn('\n== verifiedAt が古いスライス（要再確認）==')
  for (const s of stale) console.warn(`  ! ${s}`)
}

console.log(`\nURL ${urls.size} 件 / 到達不可 ${dead} 件 / 古い検証 ${stale.length} 件`)
if (dead > 0) process.exit(1)
