/** 雇用保険 基本手当の上限・下限と給付率式の値型。移植元: shitsugyo-sim koyo-hoken-2025.ts / types.ts。 */

/** 給付率テーブルの年齢区分（4区分） */
export type AgeBand = 'under30' | 'a30to44' | 'a45to59' | 'a60to64'

/**
 * 給付率の計算式。賃金日額 w（下限・上限クリップ済み）から基本手当日額を求める。
 * - rate:    y = rate * w
 * - taper:   y = 0.8w − coef × ((w − base) / divisor) × w （80%→50% の逓減部）
 * - taper60: y = min(0.8w − 0.35×((w−5340)/6460)×w, 0.05w + 4720)（60-64歳の逓減部, 80%→45%）
 * - cap:     y = amount（固定額）
 */
export type RateFormula =
  | { readonly kind: 'rate'; readonly rate: number }
  | { readonly kind: 'taper'; readonly base: number; readonly divisor: number; readonly coef: number }
  | { readonly kind: 'taper60' }
  | { readonly kind: 'cap'; readonly amount: number }

export interface BenefitRateBracket {
  /** 賃金日額の下限（この値を含む, 円） */
  readonly lower: number
  /** 賃金日額の上限（円）。null = 上限なし */
  readonly upper: number | null
  /** true なら upper を含まない（w < upper）, false なら含む（w <= upper） */
  readonly exclusiveUpper: boolean
  readonly formula: RateFormula
  /** 結果表示用ラベル */
  readonly label: string
}

export interface KoyoHokenKihonTeateValues {
  /** 賃金日額の上限（円, 年齢区分別） */
  readonly chinginUpper: Record<AgeBand, number>
  /** 賃金日額の下限（円, 全年齢共通） */
  readonly chinginLower: number
  /** 基本手当日額の上限（円, 年齢区分別） */
  readonly teateUpper: Record<AgeBand, number>
  /** 基本手当日額の下限（円, 全年齢共通） */
  readonly teateLower: number
  /** 給付率テーブル（年齢区分別。下限→上限の順） */
  readonly brackets: Record<AgeBand, readonly BenefitRateBracket[]>
}
