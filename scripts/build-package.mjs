// JSON（正）→ TypeScript 生成（単方向）。設計書§11。
// 1. 全 data/**/*.json を読み ajv + 不変条件で検証（失敗で exit 1）
// 2. 各 JSON を packages/jp-money-data/src/generated/{id}.ts に `export const {camel}: Dataset<{Pascal}Values>` として出力
// 3. index の generated バレル（generated/index.ts）と メタ一覧（datasets 配列）を再生成
import { writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs'
import { join } from 'node:path'
import { loadDatasets, validateAll, ROOT, DATA_DIR } from './lib/load-validate.mjs'

const PKG_DIR = join(ROOT, 'packages', 'jp-money-data')
const GENERATED_DIR = join(PKG_DIR, 'src', 'generated')
const PKG_DATA_DIR = join(PKG_DIR, 'data')

const camel = (id) => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
const pascal = (id) => {
  const c = camel(id)
  return c.charAt(0).toUpperCase() + c.slice(1)
}

const entries = loadDatasets()
const { ok, results } = validateAll(entries)
if (!ok) {
  for (const r of results) {
    for (const e of r.errors) console.error(`FAIL ${r.relPath}: ${e}`)
  }
  console.error('検証に失敗したため生成を中止しました。')
  process.exit(1)
}

mkdirSync(GENERATED_DIR, { recursive: true })

const HEADER =
  '// このファイルは scripts/build-package.mjs が data/*.json から自動生成します。手で編集しないこと。\n' +
  '// 生成物は .gitignore せずコミットする（差分レビュー可能にするため。設計書§11）。\n'

const ids = []
for (const { data } of entries) {
  const id = data.meta.id
  ids.push(id)
  const constName = camel(id)
  const typeName = `${pascal(id)}Values`
  const body =
    HEADER +
    `import type { Dataset } from '../core/types'\n` +
    `import type { ${typeName} } from '../datasets/${id}'\n\n` +
    `export const ${constName}: Dataset<${typeName}> = ${JSON.stringify(data, null, 2)} as const\n`
  writeFileSync(join(GENERATED_DIR, `${id}.ts`), body)
}

// generated バレル（型付き const の再エクスポート + メタ一覧）
const sortedIds = [...ids].sort()
const barrel =
  HEADER +
  `import type { DatasetMeta } from '../core/types'\n` +
  sortedIds.map((id) => `import { ${camel(id)} } from './${id}'`).join('\n') +
  '\n\n' +
  sortedIds.map((id) => `export { ${camel(id)} } from './${id}'`).join('\n') +
  '\n\n' +
  `/** 全データセットのメタ一覧（軽量。docs の一覧生成・discovery 用） */\n` +
  `export const datasetsMeta: readonly DatasetMeta[] = [\n` +
  sortedIds.map((id) => `  ${camel(id)}.meta,`).join('\n') +
  `\n]\n`
writeFileSync(join(GENERATED_DIR, 'index.ts'), barrel)

// data/*.json をパッケージ内へコピー（jsDelivr の npm/jp-money-data@1/data/... 経路のため）。
rmSync(PKG_DATA_DIR, { recursive: true, force: true })
cpSync(DATA_DIR, PKG_DATA_DIR, { recursive: true })

console.log(`生成完了: ${ids.length} データセット → ${GENERATED_DIR}`)
console.log(`data/ をパッケージへ複製 → ${PKG_DATA_DIR}`)
