/** 自動車重量税（継続検査2年・自家用乗用・エコカー外/当分の間税率）の値型。移植元: kuruma-cost tax-table.ts。 */

export interface JuryoZeiPassengerBracket {
  /**
   * 車両重量の上限（kg、0.5t刻み）。null = 上限なしの最終帯。
   * 現行データは 3,000kg 帯までを収録（自家用乗用の一般的レンジ）。それを超える重量帯は
   * meta.notes の記載どおり未収録。0.5t 増ごとに定額加算されるため、必要になれば追加する。
   */
  readonly maxKg: number | null
  /** 〜12年（円） */
  readonly normal: number
  /** 13年経過（円） */
  readonly over13y: number
  /** 18年経過（円） */
  readonly over18y: number
}

export interface JidoshaJuryoZeiValues {
  readonly passenger: readonly JuryoZeiPassengerBracket[]
  /** 軽自動車（継続検査2年） */
  readonly kei: {
    readonly normal: number
    readonly over13y: number
    readonly over18y: number
  }
  /** 二輪 */
  readonly bike: {
    /** 軽二輪（126〜250cc）: 新規届出時に1回のみ（円）。継続検査がないため年間維持費ではない */
    readonly kei2OneTime: number
    /** 小型二輪（251cc〜）の年額（円）。継続検査（2年）では ×2 を納付。経年3区分 */
    readonly over250PerYear: {
      readonly normal: number
      readonly over13y: number
      readonly over18y: number
    }
  }
}
