import Head from '../components/Head'
import CodeBlock from '../components/CodeBlock'
import { datasets, CATEGORY_LABELS, LICENSE_LABELS } from '../data'

export default function LicensePage() {
  // データセットごとの代表出典（meta.sources[0]）を一覧化
  return (
    <>
      <Head
        title="ライセンスと出典 | jp-money-data"
        description="データ = CC BY 4.0・コード = MIT。公共データ利用規約(PDL1.0)準拠の出典表記と、各データセットの一次資料一覧。"
        path="/docs/license/"
      />
      <h1>ライセンスと出典</h1>
      <p>
        本プロジェクトはデュアルライセンスです。<b>データ（data/）= CC BY 4.0</b>、
        <b>コード = MIT</b>。各データセットは <code>meta.sources</code> に一次資料を持ちます。
      </p>

      <h2>出典表記の形式（再配布・引用時）</h2>
      <p>公共データ利用規約（PDL1.0）由来のデータは、以下の形式で出典を記載してください。</p>
      <CodeBlock>{`出典: 「{資料名}」（{機関名}）（{URL}）、公共データ利用規約（PDL1.0）
（{確認日} に利用）
※本データは上記を編集・加工して作成したものであり、{機関名}が作成したものではありません。`}</CodeBlock>
      <p>
        著作権法13条により権利の目的とならない法令・告示由来の数値、および準政府機関の独自規約
        （協会けんぽ等・出所明示で利用可）由来のデータは、各出典の区分に従います。
      </p>

      <h2>収録データセットの一次資料</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>データセット</th>
            <th>カテゴリ</th>
            <th>出典機関</th>
            <th>ライセンス区分</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((d) => {
            const s = d.meta.sources[0]
            return (
              <tr key={d.meta.id}>
                <td>
                  <code>{d.meta.id}</code>
                </td>
                <td>{CATEGORY_LABELS[d.meta.category]}</td>
                <td>{s.publisher}</td>
                <td>{LICENSE_LABELS[s.license]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h2>免責</h2>
      <p className="disclaimer">
        正確性の確保に努めていますが、本データは<b>無保証</b>です（MIT / CC BY 4.0 の無保証条項）。
        給与計算・保険実務等の業務利用時は、必ず一次資料で確認してください。
        本データは法令・制度の解釈を提供するものではありません。
      </p>
    </>
  )
}
