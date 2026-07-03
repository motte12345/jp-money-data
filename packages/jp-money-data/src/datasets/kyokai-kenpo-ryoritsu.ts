/**
 * 協会けんぽ 都道府県別 健康保険料率と全国一律の介護保険料率・子ども子育て支援金率の値型。
 * 移植元: 協会けんぽ 令和8年度 都道府県毎の保険料額表（2026年3月分〜適用）。
 * 料率はいずれも労使合計（被保険者負担はその半分）。率は小数で保持（9.85% → 0.0985）。
 */

export interface KenpoPrefRate {
  readonly code: string // 都道府県コード（JIS X 0401、'01'〜'47'）
  readonly name: string // 都道府県名
  readonly healthRate: number // 健康保険料率（労使合計、小数）。介護・子育ては含まない
}

export interface KyokaiKenpoRyoritsuValues {
  /** 47都道府県の健康保険料率 */
  readonly prefs: readonly KenpoPrefRate[]
  /** 介護保険料率（第2号被保険者=40〜64歳。全国一律・労使合計、小数） */
  readonly kaigoRate: number
  /**
   * 子ども・子育て支援金率（全国一律・労使合計、小数）。
   * 健康保険料率・介護保険料率（スライスの effectiveFrom）とは適用開始が異なり、独自の effectiveFrom を持つ。
   */
  readonly kosodateShienRate: {
    readonly rate: number
    readonly effectiveFrom: string // 'YYYY-MM-DD'（この率の適用開始日）
  }
}
