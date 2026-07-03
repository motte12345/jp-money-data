/**
 * jp-money-data 共通メタスキーマ（設計書§9.1）。
 * 金額は常に整数円、率は常に小数（9.91% → 0.0991）、日付・期間は YYYY-MM-DD。
 */

/** 値の単位。金額は常に整数円。率は常に小数。 */
export type Unit =
  | 'JPY' // 円（整数）
  | 'JPY_PER_YEAR' // 円/年
  | 'JPY_PER_MONTH' // 円/月
  | 'JPY_PER_DAY' // 円/日
  | 'RATE' // 無次元の率（0.0991）
  | 'DAY' // 日数
  | 'MIXED' // 複合（values 内の各フィールドに単位が混在）

export type DatasetCategory =
  | 'tax' // 税（自動車税・重量税・退職所得課税）
  | 'compulsory-insurance' // 強制保険（自賠責）
  | 'social-insurance' // 社会保険（標準報酬月額・協会けんぽ・傷病手当金）
  | 'labor' // 労働保険・雇用保険（基本手当・育休給付）
  | 'subsidy' // 補助金

/** 出典のライセンス区分（設計書§14 の調査結果を型に固定） */
export type SourceLicense =
  | 'PDL-1.0' // 公共データ利用規約 第1.0版（CC BY 4.0互換）
  | 'copyright-free-art13' // 著作権法13条（法令・告示）により権利の目的とならない
  | 'permission-required' // 事前許諾が必要（GIROJ等）— 許諾取得後のみ収録可
  | 'quasi-govt-quote' // 準政府機関の独自規約（協会けんぽ等）— 数値の独自構造化＋出所明示で利用

export interface SourceRef {
  readonly title: string // 資料名
  readonly url: string // 一次資料URL（PDF直リンク推奨）
  readonly publisher: string // 発行機関
  readonly license: SourceLicense
  readonly accessedAt: string // 'YYYY-MM-DD' 最終アクセス日
}

export interface Revision {
  readonly effectiveOn: string // 改定の適用開始日 'YYYY-MM-DD'
  readonly summary: string // 人間向け1行サマリ
  readonly sourceUrl: string | null
}

export interface DatasetMeta {
  readonly id: string // kebab-case ローマ字
  readonly name: string // 日本語名
  readonly nameEn: string // 英語名（LLM・海外開発者向け）
  readonly category: DatasetCategory
  readonly description: string // 1〜2文
  readonly unit: Unit // 既定単位。'MIXED' は values 側で個別定義
  readonly updateCycle: 'yearly' | 'on-revision'
  readonly updateMonth: number | null // 定例改定月（雇用保険=8, 協会けんぽ=3）。on-revision は null
  readonly sources: readonly SourceRef[] // データセット全体の代表出典
  readonly revisionHistory: readonly Revision[] // 新しい順
  readonly notes: readonly string[] // 適用上の注意
}

/**
 * 有効期間つきの値スライス。改定のたびにスライスを「追加」し、既存スライスは変更しない
 * （追記のみ = 過去日付の計算互換）。
 */
export interface TimeSlice<T> {
  readonly effectiveFrom: string // 'YYYY-MM-DD'（この日以降に適用）
  readonly effectiveTo: string | null // 'YYYY-MM-DD'（この日まで適用）。null = 現行
  readonly sources: readonly SourceRef[] // このスライス固有の根拠
  readonly verifiedAt: string // このスライスの値を一次資料と照合した日
  readonly values: T // データセット固有の値
}

export interface Dataset<T> {
  readonly meta: DatasetMeta
  readonly slices: readonly TimeSlice<T>[] // effectiveFrom 昇順
}
