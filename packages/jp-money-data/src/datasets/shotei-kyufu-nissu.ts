/** 雇用保険 基本手当の所定給付日数の値型。移植元: shitsugyo-sim kyufu-nissu-table.ts。 */

/** 特定受給資格者の年齢区分（5区分） */
export type TokuteiAgeBand = 'under30' | 'a30to34' | 'a35to44' | 'a45to59' | 'a60to64'

/** 一般の離職者の被保険者期間区分。null = 受給資格なし（1年未満は離職前2年で12ヶ月必要） */
export interface IppanDays {
  readonly under1y: number | null // 1年未満
  readonly y1to10: number | null // 1年以上10年未満
  readonly y10to20: number | null // 10年以上20年未満
  readonly y20plus: number | null // 20年以上
}

/** 特定受給資格者・特定理由離職者の被保険者期間区分。null = その区分は存在しない */
export interface TokuteiDays {
  readonly m6to1y: number | null // 6か月以上1年未満
  readonly y1to5: number | null // 1年以上5年未満
  readonly y5to10: number | null // 5年以上10年未満
  readonly y10to20: number | null // 10年以上20年未満
  readonly y20plus: number | null // 20年以上（30歳未満は存在しない）
}

export interface ShoteiKyufuNissuValues {
  /** 一般の離職者（自己都合・定年等）。被保険者期間のみで決まる（年齢不問） */
  readonly ippan: IppanDays
  /** 特定受給資格者・特定理由離職者（倒産・解雇・雇止め等）。年齢×被保険者期間 */
  readonly tokutei: Record<TokuteiAgeBand, TokuteiDays>
  /** 就職困難者（障害者等） */
  readonly konnan: {
    readonly under1y: number // 被保険者期間1年未満（全年齢）
    readonly under45: number // 1年以上・45歳未満
    readonly a45to64: number // 1年以上・45歳以上65歳未満
  }
}
