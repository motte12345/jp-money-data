import { Link } from 'react-router-dom'
import Head from '../components/Head'
import CodeBlock from '../components/CodeBlock'
import { NPM } from '../site'

export default function GettingStartedPage() {
  return (
    <>
      <Head
        title="使い方 — npm / CDN / 生JSON | jp-money-data"
        description="npm install jp-money-data から3行で制度データを取得する方法。npm・jsDelivr(CDN)・GitHub raw の各経路と、resolveSlice / currentSlice の使い方。"
        path="/docs/getting-started/"
      />
      <h1>使い方</h1>

      <h2>インストール</h2>
      <CodeBlock>{`npm install ${NPM}`}</CodeBlock>

      <h2>現在値を取得する</h2>
      <p>
        各データセットは有効期間つきの <code>slices</code> を持ちます。現行スライス（
        <code>effectiveTo === null</code>）は <code>currentSlice()</code> で取れます。
      </p>
      <CodeBlock>{`import { koyoHokenKihonTeate, currentSlice, resolveSlice } from '${NPM}'

// 現行スライス
const now = currentSlice(koyoHokenKihonTeate)
console.log(now.values.teateUpper.under30) // 7255

// 基準日で解決（過去日の値も引ける）
const at = resolveSlice(koyoHokenKihonTeate, '2025-09-01')
console.log(at?.effectiveFrom) // '2025-08-01'`}</CodeBlock>
      <p>
        <code>resolveSlice(ds, 'YYYY-MM-DD')</code> は基準日に適用されるスライスを返します
        （収録範囲外の過去日は <code>null</code>、不正な日付形式は <code>RangeError</code>）。
      </p>

      <h2>データセット単位で import（tree-shaking）</h2>
      <CodeBlock>{`import { koseiNenkin } from '${NPM}/datasets/kosei-nenkin'`}</CodeBlock>

      <h2>CDN / 生JSON</h2>
      <p>ビルドを介さず生の JSON を取得できます（<code>@0.1.0</code> のようにバージョン固定も可能）。推奨は jsDelivr（npm ミラー・自前APIなし）:</p>
      <CodeBlock>{`https://cdn.jsdelivr.net/npm/${NPM}@0/data/labor/koyo-hoken-kihon-teate.json`}</CodeBlock>
      <p>GitHub raw も利用できます（リポジトリ公開後）:</p>
      <CodeBlock>{`https://raw.githubusercontent.com/<owner>/${NPM}/main/data/labor/koyo-hoken-kihon-teate.json`}</CodeBlock>

      <h2>型</h2>
      <p>
        すべてのデータセットは <code>Dataset&lt;T&gt;</code> 型で、値型 <code>T</code> はデータセット毎に
        エクスポートされています。金額は整数円、率は小数、日付は <code>YYYY-MM-DD</code> に正規化されています。
        詳細は <Link to="/docs/schema">スキーマ仕様</Link> を参照してください。
      </p>
    </>
  )
}
