/** 厚生年金保険料率・標準報酬月額の上下限の値型。 */

export interface KoseiNenkinValues {
  /** 保険料率（労使合計。2017年9月以降 18.3% で固定） */
  readonly rate: number
  /** 標準報酬月額の下限（円） */
  readonly monthlyMin: number
  /** 標準報酬月額の上限（円） */
  readonly monthlyMax: number
  /** 標準報酬月額の等級数 */
  readonly grades: number
}
