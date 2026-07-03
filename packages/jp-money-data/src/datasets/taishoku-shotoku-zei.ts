/**
 * 退職所得の税（退職所得控除・所得税速算表・復興特別所得税・住民税）の値型。
 * 移植元: shitsugyo-sim taishoku-tax-2026.ts。
 *
 * 住民税は市町村民税(6%)・道府県民税(4%)を分離フィールドで保持する。退職所得の分離課税では
 * 市・県を別々に課税標準へ乗じ、各々100円未満を切り捨てて合算するため、合計10%を一括で
 * 切り捨てると最大99円ずれる（KNOWLEDGE.md 2026-07-04）。
 */

/** 退職所得・所得税の速算表の1段 */
export interface IncomeTaxBracket {
  /** この課税所得以下に適用（円）。null = 上限なし */
  readonly upTo: number | null
  readonly rate: number
  /** 速算控除額（円） */
  readonly deduction: number
}

export interface TaishokuShotokuZeiValues {
  /** 退職所得控除の係数 */
  readonly kojo: {
    readonly under20PerYear: number // 勤続20年以下: 1年あたりの控除額（円）
    readonly min: number // 控除の最低額（円）
    readonly over20Base: number // 勤続20年超の基礎控除額（円）
    readonly over20PerYear: number // 勤続20年超: 20年を超える1年あたりの控除額（円）
    readonly disabilityBonus: number // 障害起因退職の加算額（円）
  }
  /** 所得税の速算表（5%〜45%） */
  readonly incomeTaxBrackets: readonly IncomeTaxBracket[]
  /** 復興特別所得税の税率 */
  readonly reconstructionRate: number
  /** 住民税・市町村民税の税率（課税退職所得に乗じ、100円未満切り捨て） */
  readonly shiminZeiRate: number
  /** 住民税・道府県民税の税率（課税退職所得に乗じ、100円未満切り捨て） */
  readonly kenminZeiRate: number
  /** 短期退職手当等（勤続5年以下・非役員）で控除後 1/2 が適用される上限（円） */
  readonly shortServiceHalfCap: number
  /** 短期退職判定の勤続年数しきい値（年） */
  readonly shortServiceYears: number
}
