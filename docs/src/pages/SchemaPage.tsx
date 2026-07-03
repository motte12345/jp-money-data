import Head from '../components/Head'
import CodeBlock from '../components/CodeBlock'

export default function SchemaPage() {
  return (
    <>
      <Head
        title="データスキーマ仕様 | jp-money-data"
        description="全データセット共通のメタスキーマ（出典・有効期間・改定履歴）の仕様。金額は整数円・率は小数・日付は YYYY-MM-DD、スライスは追記のみ。"
        path="/docs/schema/"
      />
      <h1>データスキーマ仕様</h1>
      <p>全データセットは共通の <code>meta</code> + <code>slices</code> 構造を持ちます。</p>

      <CodeBlock>{`interface Dataset<T> {
  meta: DatasetMeta
  slices: TimeSlice<T>[]   // effectiveFrom 昇順
}

interface DatasetMeta {
  id: string               // kebab-case
  name: string             // 日本語名
  nameEn: string
  category: 'tax' | 'compulsory-insurance' | 'social-insurance' | 'labor' | 'subsidy'
  description: string
  unit: 'JPY' | 'JPY_PER_YEAR' | 'JPY_PER_MONTH' | 'JPY_PER_DAY' | 'RATE' | 'DAY' | 'MIXED'
  updateCycle: 'yearly' | 'on-revision'
  updateMonth: number | null
  sources: SourceRef[]
  revisionHistory: Revision[]   // 新しい順
  notes: string[]
}

interface TimeSlice<T> {
  effectiveFrom: string    // 'YYYY-MM-DD'（この日以降に適用）
  effectiveTo: string | null  // 'YYYY-MM-DD'（この日まで）。null = 現行
  sources: SourceRef[]
  verifiedAt: string       // 一次資料と照合した日
  values: T                // データセット固有の値
}`}</CodeBlock>

      <h2>規約</h2>
      <ul>
        <li>金額は<b>整数円</b>。上限なしは <code>null</code>（JSON に Infinity は書けないため）。</li>
        <li>率は<b>小数</b>（18.3% → <code>0.183</code>）。<code>percent</code> 表記は持たない。</li>
        <li>日付・期間はすべて <code>YYYY-MM-DD</code>。</li>
        <li>スライスは<b>追記のみ</b>。改定時は現行スライスに <code>effectiveTo</code> を入れ、新スライスを追加（過去日の計算互換を保つ）。</li>
        <li>全データセットに<b>現行スライスが必ず1本</b>（<code>effectiveTo: null</code>）。</li>
      </ul>
      <p>
        これらの不変条件（現行スライス1本・期間の重複/隙間なし・値域）は CI（JSON Schema 検証 +
        アンカー値テスト）で保証しています。
      </p>
    </>
  )
}
