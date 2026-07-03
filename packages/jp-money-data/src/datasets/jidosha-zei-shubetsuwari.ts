/** 自動車税種別割（自家用乗用）の値型。移植元: kuruma-cost tax-table.ts。 */

export interface JidoshaZeiBracket {
  /** この排気量「以下」に適用（cc）。null = 最終帯（上限なし。旧 Infinity） */
  readonly maxCc: number | null
  /** 2019年10月以降の初度登録の年額（円） */
  readonly post201910: number
  /** 2019年9月以前の初度登録の年額（円） */
  readonly pre201909: number
}

export interface JidoshaZeiShubetsuwariValues {
  readonly brackets: readonly JidoshaZeiBracket[]
  /** 経年重課ルール（自家用乗用・ガソリン/ディーゼル） */
  readonly surcharge: {
    /** ガソリン・LPG は登録から何年超で重課か */
    readonly gasolineYears: number
    /** ディーゼルは何年超で重課か */
    readonly dieselYears: number
    /** 重課率（おおむね。100円未満切り捨てで丸める） */
    readonly rate: number
    /** 重課対象外の燃料種別（HV・EV 等） */
    readonly exemptFuels: readonly string[]
  }
}
