/** 自動車・二輪の検査手数料（車検の法定検査手数料）の値型。移植元: 17§9.1。 */

export interface ShakenTesuryoValues {
  /**
   * 二輪の継続検査（持込・ユーザー車検）の検査手数料。
   * 2026-04改定後は 印紙600円 + 証紙1,500円 = 2,100円（多くのネット記事は改定前の1,800円のまま）。
   */
  readonly bikeContinuationBringIn: {
    readonly total: number
    readonly inshi: number // 自動車検査登録印紙
    readonly shoshi: number // 自動車審査証紙
  }
}
