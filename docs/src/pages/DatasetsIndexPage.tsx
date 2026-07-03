import { Link } from 'react-router-dom'
import Head from '../components/Head'
import { datasets, currentSlice, CATEGORY_LABELS, type DatasetCategory } from '../data'

const CAT_ORDER: DatasetCategory[] = [
  'tax',
  'social-insurance',
  'labor',
  'subsidy',
  'compulsory-insurance',
]

export default function DatasetsIndexPage() {
  return (
    <>
      <Head
        title="データセット一覧 | jp-money-data"
        description="収録データセットの一覧。カテゴリ・更新周期・最終検証日つき。税・社会保険・労働保険・補助金の制度パラメータ。"
        path="/datasets/"
      />
      <h1>データセット一覧</h1>
      <p>制度パラメータ {datasets.length} 本。各ページに早見表・出典・改定履歴・取得方法（npm/CDN）を掲載しています。</p>

      {CAT_ORDER.filter((c) => datasets.some((d) => d.meta.category === c)).map((cat) => (
        <section key={cat}>
          <h2>{CATEGORY_LABELS[cat]}</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>データセット</th>
                <th>id</th>
                <th>更新周期</th>
                <th>最終検証</th>
              </tr>
            </thead>
            <tbody>
              {datasets
                .filter((d) => d.meta.category === cat)
                .map((d) => (
                  <tr key={d.meta.id}>
                    <td>
                      <Link to={`/datasets/${d.meta.id}`}>{d.meta.name}</Link>
                    </td>
                    <td>
                      <code>{d.meta.id}</code>
                    </td>
                    <td>
                      {d.meta.updateCycle === 'yearly'
                        ? `毎年${d.meta.updateMonth ?? ''}月`
                        : '改定時'}
                    </td>
                    <td>{currentSlice(d).verifiedAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}
    </>
  )
}
