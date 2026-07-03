import { Link } from 'react-router-dom'
import Head from '../components/Head'
import JsonLd from '../components/JsonLd'
import CodeBlock from '../components/CodeBlock'
import { datasets, CATEGORY_LABELS, type DatasetCategory } from '../data'
import { SITE, NPM } from '../site'

export default function HomePage() {
  const byCat = new Map<DatasetCategory, number>()
  for (const d of datasets) byCat.set(d.meta.category, (byCat.get(d.meta.category) ?? 0) + 1)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'jp-money-data',
    url: `${SITE}/`,
    description:
      '日本の税・保険・給付の制度パラメータを出典・改定履歴つき JSON/TypeScript で配布する OSS。',
  }

  return (
    <>
      <Head
        title="jp-money-data — 日本の税・保険・給付の制度データを JSON で"
        description="自賠責・軽自動車税・標準報酬月額・雇用保険などの制度パラメータを出典・改定履歴つき JSON/TypeScript で無料配布。MIT / CC BY 4.0。"
        path="/"
      />
      <JsonLd data={jsonLd} />

      <section className="hero">
        <h1>日本の税・保険・給付の制度データを JSON で</h1>
        <p className="lead">
          自動車税・軽自動車税・重量税・標準報酬月額・雇用保険・退職所得税などの
          <b>制度パラメータ</b>を、<b>出典URL・検証日・有効期間・改定履歴つき</b>の
          JSON + TypeScript 型で配布します。データ = CC BY 4.0 / コード = MIT。
        </p>
        <CodeBlock>{`npm install ${NPM}`}</CodeBlock>
        <CodeBlock>{`import { koyoHokenKihonTeate, currentSlice } from '${NPM}'\n\ncurrentSlice(koyoHokenKihonTeate).values.teateUpper.under30 // 7255（令和7年8月〜）`}</CodeBlock>
        <p>
          <Link className="btn" to="/datasets">
            データセット一覧（{datasets.length}本）
          </Link>{' '}
          <Link className="btn btn-ghost" to="/docs/getting-started">
            使い方
          </Link>
        </p>
      </section>

      <section>
        <h2>なぜ作ったか</h2>
        <p>
          料率表・等級表は PDF/HTML に散在し、「毎年改定される制度の現在値」を
          改定履歴つきで構造化した公開物はほとんどありません（data.go.jp で「自賠責」は0件、
          GitHub で「標準報酬月額」を検索すると PDF を OCR しているリポジトリが出るほど）。
          本プロジェクトは制度パラメータの「現在値＋過去スライス＋出典」を一箇所に集約し、
          <code>npm install</code> だけで参照できるようにします。API キー・登録・課金はありません。
        </p>
      </section>

      <section>
        <h2>収録カテゴリ</h2>
        <div className="cat-grid">
          {(Object.keys(CATEGORY_LABELS) as DatasetCategory[])
            .filter((c) => byCat.has(c))
            .map((c) => (
              <div key={c} className="cat-card">
                <div className="cat-name">{CATEGORY_LABELS[c]}</div>
                <div className="cat-count">{byCat.get(c)} データセット</div>
              </div>
            ))}
        </div>
        <p>
          <Link to="/datasets">すべてのデータセットを見る →</Link>
        </p>
      </section>

      <section>
        <h2>データ構造</h2>
        <p>
          各データセットは <code>meta</code>（出典・検証日・更新周期・改定履歴）と
          <code>slices</code>（有効期間つきの値）から成ります。金額は整数円、率は小数
          （18.3% → <code>0.183</code>）、日付は <code>YYYY-MM-DD</code>。改定時は現行スライスに
          <code>effectiveTo</code> を入れて新スライスを追加します（追記のみ＝過去日の計算互換）。
          詳しくは <Link to="/docs/schema">スキーマ仕様</Link>。
        </p>
      </section>
    </>
  )
}
