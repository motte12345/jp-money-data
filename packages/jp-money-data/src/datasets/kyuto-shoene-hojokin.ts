/** 給湯省エネ／住宅省エネ関連の補助金の値型。移植元: 16§9-4（経産省・国交省）。 */

export type SubsidyStatus = 'open' | 'closed' | 'upcoming' | 'unknown'

export interface SubsidyProgram {
  readonly id: string
  readonly programName: string
  /** 補助対象の給湯機器（'ecocute' | 'gas-ecojozu' | 'oil-ecofeel' 等の識別子） */
  readonly targetHeater: string
  /** 基本額（円） */
  readonly baseYen: number
  /** 性能加算（円。0=加算なし） */
  readonly performanceBonusYen: number
  /** 撤去加算（現方式が該当する場合の加算。円） */
  readonly removalBonus: readonly { readonly fromHeater: string; readonly yen: number }[]
  /** 申請期限 'YYYY-MM-DD'。超過分は利用側で「終了」表示に切替える運用 */
  readonly applyDeadline: string
  readonly status: SubsidyStatus
  readonly note: string
  /** 一次情報URL */
  readonly sourceUrl: string
  /** この補助金情報の最終確認日 'YYYY-MM-DD' */
  readonly verifiedAt: string
}

export interface KyutoShoeneHojokinValues {
  readonly programs: readonly SubsidyProgram[]
}
