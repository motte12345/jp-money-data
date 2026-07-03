import { describe, it, expect } from 'vitest'
// 検証ロジック（ajv スキーマ + スライス不変条件）を全 data/*.json に対して実行する。
import { validateAll, listDataFiles } from '../../../scripts/lib/load-validate.mjs'
import * as pkg from '../src'

const datasetsMeta = pkg.datasetsMeta

// テストが値ツリーを走査するための最小構造（値型は個別に検証済みなので unknown で十分）。
interface AnyDataset {
  readonly meta: { readonly id: string }
  readonly slices: readonly { readonly effectiveFrom: string; readonly values: unknown }[]
}

// バレルから Dataset 形状（meta + slices を持つ）の const を自動収集（新規追加も自動でカバー）。
const allDatasets = (Object.values(pkg) as unknown[]).filter(
  (v): v is AnyDataset =>
    typeof v === 'object' &&
    v !== null &&
    'meta' in v &&
    'slices' in v &&
    Array.isArray((v as { slices: unknown }).slices),
)

/** values ツリーを走査し、各数値リーフに対して check を呼ぶ。 */
function walkNumbers(node: unknown, key: string, check: (n: number, key: string) => void): void {
  if (typeof node === 'number') check(node, key)
  else if (Array.isArray(node)) node.forEach((v) => walkNumbers(v, key, check))
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walkNumbers(v, k, check)
  }
}

describe('データセット不変条件（全 JSON）', () => {
  it('全データセットが schema + 不変条件に適合', () => {
    const { ok, results } = validateAll()
    const failures = results.filter((r) => r.errors.length > 0)
    // 失敗時は内容を可視化
    expect(failures.map((f) => `${f.relPath}: ${f.errors.join('; ')}`)).toEqual([])
    expect(ok).toBe(true)
  })

  it('生成された datasetsMeta の件数が data/*.json と一致', () => {
    expect(datasetsMeta.length).toBe(listDataFiles().length)
  })

  it('全メタが必須フィールドと非空 sources を持つ', () => {
    for (const m of datasetsMeta) {
      expect(m.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect(m.name.length).toBeGreaterThan(0)
      expect(m.nameEn.length).toBeGreaterThan(0)
      expect(m.sources.length).toBeGreaterThan(0)
    }
  })

  it('revisionHistory は新しい順（effectiveOn 降順）', () => {
    for (const m of datasetsMeta) {
      const dates = m.revisionHistory.map((r) => r.effectiveOn)
      const sorted = [...dates].sort((a, b) => b.localeCompare(a))
      expect(dates, `${m.id} の revisionHistory は降順であるべき`).toEqual(sorted)
    }
  })
})

// 値域サニティ（設計書§15「値域テスト」。特に 47都道府県料率など転記ミスの磁石になる領域向け）。
describe('値域サニティ（全データセットの数値リーフ）', () => {
  it('バレルから7本以上の Dataset を収集できている', () => {
    expect(allDatasets.length).toBe(datasetsMeta.length)
    expect(allDatasets.length).toBeGreaterThanOrEqual(7)
  })

  it('全数値は有限・非負。率（*rate/*Rate）は 0 以上 1 以下', () => {
    for (const ds of allDatasets) {
      for (const slice of ds.slices) {
        walkNumbers(slice.values, 'values', (n, key) => {
          const where = `${ds.meta.id} @ ${slice.effectiveFrom} [${key}=${n}]`
          expect(Number.isFinite(n), where).toBe(true)
          expect(n, where).toBeGreaterThanOrEqual(0)
          if (/rate$/i.test(key)) {
            // 率フィールドは小数（例: 0.183）。10 や 18.3 のような桁違い転記を検出する。
            expect(n, `${where} は率なので 0..1 のはず`).toBeLessThanOrEqual(1)
          }
        })
      }
    }
  })
})
