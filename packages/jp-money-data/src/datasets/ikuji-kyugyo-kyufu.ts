/**
 * 育児休業給付・出産関連給付の上限額の値型。移植元: 13§9（厚労省・雇用保険法／健康保険法）。
 *
 * 月額上限は休業開始時賃金日額上限（16,110円=令和7年8月改定・30歳以上45歳未満相当）から導出（円未満切り捨て）:
 *   ikukyuMonthlyCap67 = floor(16,110 × 30 × 0.67) = 323,811
 *   ikukyuMonthlyCap50 = floor(16,110 × 30 × 0.50) = 241,650
 *   shusseijiCap28d    = floor(16,110 × 28 × 0.67) = 302,223（302,223.6 を切捨て）
 *   shienCap28d        = floor(16,110 × 28 × 0.13) = 58,640（58,640.4 を切捨て・出生後休業支援給付金 13%）
 */

export interface IkujiKyugyoKyufuValues {
  /** 休業開始時賃金日額 上限（円） */
  readonly wageDailyCap: number
  /** 同 下限（円） */
  readonly wageDailyFloor: number
  /** 育児休業給付金 月額上限（67%・30日、円） */
  readonly ikukyuMonthlyCap67: number
  /** 育児休業給付金 月額上限（50%・30日、円） */
  readonly ikukyuMonthlyCap50: number
  /** 出生時育児休業給付金 上限（28日、円） */
  readonly shusseijiCap28d: number
  /** 出生後休業支援給付金 上限（28日、円） */
  readonly shienCap28d: number
  /** 出産育児一時金（産科医療補償制度の対象分娩、円） */
  readonly shussanIchijikin: number
  /** 出産育児一時金（対象外分娩、円） */
  readonly shussanIchijikinNoHosho: number
}
