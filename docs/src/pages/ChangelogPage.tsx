import { Link } from 'react-router-dom'
import Head from '../components/Head'
import { datasets } from '../data'

export default function ChangelogPage() {
  // 全データセットの改定履歴を effectiveOn 降順で集約（それ自体が「改定まとめ」コンテンツ）。
  const rows = datasets
    .flatMap((d) =>
      d.meta.revisionHistory.map((r) => ({
        id: d.meta.id,
        name: d.meta.name,
        effectiveOn: r.effectiveOn,
        summary: r.summary,
      })),
    )
    .sort((a, b) => b.effectiveOn.localeCompare(a.effectiveOn))

  return (
    <>
      <Head
        title="更新履歴（制度改定の反映） | jp-money-data"
        description="収録データに反映した制度改定の履歴。適用日の新しい順。自賠責・雇用保険・協会けんぽ料率などの改定まとめ。"
        path="/changelog/"
      />
      <h1>更新履歴（制度改定の反映）</h1>
      <p>
        各データセットに収録した制度改定を、適用日の新しい順にまとめています。
        値の詳細と出典は各<Link to="/datasets">データセット</Link>ページを参照してください。
      </p>
      <table className="data-table">
        <thead>
          <tr>
            <th>適用日</th>
            <th>データセット</th>
            <th>改定内容</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.effectiveOn}</td>
              <td>
                <Link to={`/datasets/${r.id}`}>{r.name}</Link>
              </td>
              <td>{r.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
