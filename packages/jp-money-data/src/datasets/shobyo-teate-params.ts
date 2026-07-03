/**
 * 傷病手当金の計算パラメータの値型。移植元: 12§9（協会けんぽ・健康保険法99条）。
 *
 * 日額 = 支給開始日以前の継続12ヶ月間の標準報酬月額の平均 ÷ dailyDivisor × (numerator/denominator)。
 * 端数処理（健康保険法99条2項の法定事項）:
 *  - ÷30 の段階: 10円単位で四捨五入（5円未満切捨て・5円以上10円未満切上げ）
 *  - ×2/3 の段階: 1円単位で四捨五入（50銭未満切捨て・50銭以上切上げ）
 */

export interface ShobyoTeateParamsValues {
  /** 給付割合（2/3）。浮動小数を避けるため分子・分母で保持 */
  readonly benefitFraction: {
    readonly numerator: number // 2
    readonly denominator: number // 3
  }
  /** 平均標準報酬月額を日額へ換算する除数（30） */
  readonly dailyDivisor: number
  /**
   * 加入12ヶ月未満の特例で使う「全被保険者の標準報酬月額の平均額」（円）。
   * 実際の平均額とこの額の低い方を用いる。支給開始日 令和7年4月1日以降は 320,000。
   */
  readonly zenhiHeikinCap: number
  /** 待期日数（連続。有給・土日祝を含んでよい。4日目から支給対象） */
  readonly waitingDays: number
  /** 支給期間（支給開始日から通算の月数。2022-01-01 施行の通算1年6ヶ月=18） */
  readonly tsusanMonths: number
}
