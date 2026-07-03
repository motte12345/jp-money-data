/** 軽自動車税種別割の値型。移植元: kuruma-cost tax-table.ts（四輪）。 */

/** 二輪・原付の排気量区分別 年額（全国一律の標準税率） */
export interface KeiTwoWheelBracket {
  /** この排気量「以下」に適用（cc）。null = 上限なしの最終帯（小型二輪 251cc〜） */
  readonly maxCc: number | null
  /** 年額（円） */
  readonly amount: number
}

export interface KeiJidoshaZeiValues {
  /** 四輪 自家用乗用。重課は「約20%増」の概算ではなく heavy13y の法定額が正（二輪に経年重課はない） */
  readonly fourWheelPassenger: {
    /** 標準税額（円/年。2015-04-01 以降の新規検査） */
    readonly normal: number
    /** 13年超の経年重課後の年額（円）。法定の固定額 */
    readonly heavy13y: number
  }
  /** 二輪・原付（原付一種・原付二種乙/甲・軽二輪・小型二輪） */
  readonly twoWheel: {
    readonly brackets: readonly KeiTwoWheelBracket[]
    /** 新基準原付（総排気量125cc以下かつ最高出力4.0kW以下）は原付一種と同額 */
    readonly shinKijunGentsuki: number
  }
}
