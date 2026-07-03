// データセット JSON の検証（ajv スキーマ + スライス不変条件）。CI の第一ゲート。
import { validateAll, loadDatasets } from './lib/load-validate.mjs'

const entries = loadDatasets()
const { ok, results } = validateAll(entries)

let total = 0
for (const r of results) {
  if (r.errors.length === 0) {
    console.log(`  ok  ${r.relPath}`)
  } else {
    console.error(`FAIL  ${r.relPath}`)
    for (const e of r.errors) console.error(`        - ${e}`)
    total += r.errors.length
  }
}

console.log(`\n${entries.length} データセット / エラー ${total} 件`)
if (!ok) process.exit(1)
