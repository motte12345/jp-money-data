import type { Dataset, TimeSlice } from './types'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function assertDate(date: string): void {
  if (!DATE_RE.test(date)) {
    throw new RangeError(`日付は 'YYYY-MM-DD' 形式で指定してください: ${JSON.stringify(date)}`)
  }
}

/**
 * 基準日に適用されるスライスを返す。該当なし（収録範囲外の過去日）は null。
 * date 形式が不正なら RangeError（曖昧に null を返さない）。
 * 比較は ISO 文字列の辞書順（YYYY-MM-DD は辞書順=時系列順）。
 */
export function resolveSlice<T>(ds: Dataset<T>, date: string): TimeSlice<T> | null {
  assertDate(date)
  for (const s of ds.slices) {
    const fromOk = s.effectiveFrom <= date
    const toOk = s.effectiveTo === null || date <= s.effectiveTo
    if (fromOk && toOk) return s
  }
  return null
}

/**
 * 現行スライス（effectiveTo === null）。
 * データ規約上、必ず1本存在する（CI の不変条件が保証）。
 */
export function currentSlice<T>(ds: Dataset<T>): TimeSlice<T> {
  const s = ds.slices.find((x) => x.effectiveTo === null)
  if (!s) {
    throw new Error(`現行スライスが見つかりません（データ不整合）: ${ds.meta.id}`)
  }
  return s
}
