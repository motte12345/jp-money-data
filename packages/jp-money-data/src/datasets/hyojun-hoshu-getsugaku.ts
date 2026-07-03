/**
 * 標準報酬月額 等級表の値型。移植元: 協会けんぽ 令和8年度 保険料額表（健康保険法40条別表）。
 * 健康保険は第1級58,000円〜第50級1,390,000円の50等級。厚生年金は健保の第4級〜第35級に対応する32等級。
 */

export interface HyojunHoshuGrade {
  readonly grade: number // 健康保険の等級（1〜50）
  readonly monthly: number // 標準報酬月額（円）
  readonly lower: number // 報酬月額 下限（以上、円）。第1級は0
  readonly upper: number | null // 報酬月額 上限（未満、円）。第50級は null
}

export interface HyojunHoshuGetsugakuValues {
  /** 健康保険の標準報酬月額 等級表（50件） */
  readonly kenpo: readonly HyojunHoshuGrade[]
  /** 厚生年金の標準報酬月額の枠（健保の第4〜35級に対応する32等級） */
  readonly kosei: {
    readonly minMonthly: number // 88,000（第1級）
    readonly maxMonthly: number // 650,000（第32級）
    readonly grades: number // 32
  }
}
