import { Link, useParams } from 'react-router-dom'
import Head from '../components/Head'
import JsonLd from '../components/JsonLd'
import ValueNode from '../components/ValueNode'
import CodeBlock from '../components/CodeBlock'
import {
  datasetById,
  CATEGORY_LABELS,
  LICENSE_LABELS,
  type SourceRef,
} from '../data'
import { SITE, NPM, cdnJsonUrl, camelId } from '../site'

function Sources({ sources }: { sources: SourceRef[] }) {
  return (
    <ul className="sources">
      {sources.map((s, i) => (
        <li key={i}>
          「<a href={s.url}>{s.title}</a>」（{s.publisher}）
          <span className="tag">{LICENSE_LABELS[s.license]}</span>
          <span className="muted">（{s.accessedAt} 確認）</span>
        </li>
      ))}
    </ul>
  )
}

export default function DatasetDetailPage() {
  const { id } = useParams()
  const ds = id ? datasetById.get(id) : undefined

  if (!ds) {
    return (
      <>
        <Head title="データセットが見つかりません | jp-money-data" description="指定されたデータセットは存在しません。" path={`/datasets/${id ?? ''}`} />
        <h1>データセットが見つかりません</h1>
        <p>
          <Link to="/datasets">データセット一覧へ戻る</Link>
        </p>
      </>
    )
  }

  const { meta, slices } = ds
  const ordered = [...slices].sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom))
  const cur = ordered[0]
  const path = `/datasets/${meta.id}`
  const cdn = cdnJsonUrl(meta.category, meta.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: meta.name,
    alternateName: meta.nameEn,
    description: meta.description,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isBasedOn: meta.sources.map((s) => s.url),
    creator: { '@type': 'Organization', name: 'jp-money-data', url: SITE },
    temporalCoverage: `${cur.effectiveFrom}/..`,
    url: `${SITE}${path}/`,
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: cdn,
      },
    ],
  }

  return (
    <>
      <Head
        title={`${meta.name} — 早見表・JSON | jp-money-data`}
        description={`${meta.description} 出典・改定履歴つき JSON/TypeScript で取得できます。`}
        path={`${path}/`}
      />
      <JsonLd data={jsonLd} />

      <nav className="crumbs">
        <Link to="/">jp-money-data</Link> ＞ <Link to="/datasets">データセット</Link> ＞ {meta.name}
      </nav>

      <h1>{meta.name}</h1>
      <p className="subtle">{meta.nameEn}</p>
      <p className="meta-line">
        <span className="tag">{CATEGORY_LABELS[meta.category]}</span>
        <code>{meta.id}</code>
        <span className="muted">
          更新周期: {meta.updateCycle === 'yearly' ? `毎年${meta.updateMonth ?? ''}月` : '改定時'} / 最終検証: {cur.verifiedAt}
        </span>
      </p>
      <p>{meta.description}</p>

      {ordered.map((slice, i) => (
        <section key={slice.effectiveFrom} className="slice">
          <h2>
            {i === 0 ? '現行値' : '過去の値'}（{slice.effectiveFrom} 〜 {slice.effectiveTo ?? '現行'}）
          </h2>
          <ValueNode value={slice.values} />
        </section>
      ))}

      <section>
        <h2>取得方法</h2>
        <CodeBlock>{`import { ${camelId(meta.id)}, currentSlice } from '${NPM}'\n\nconst now = currentSlice(${camelId(meta.id)})\nconsole.log(now.values)`}</CodeBlock>
        <p>データセット単位のサブパス import（tree-shaking）:</p>
        <CodeBlock>{`import { ${camelId(meta.id)} } from '${NPM}/datasets/${meta.id}'`}</CodeBlock>
        <p>CDN（jsDelivr・生JSON）:</p>
        <CodeBlock>{cdn}</CodeBlock>
      </section>

      {meta.revisionHistory.length > 0 && (
        <section>
          <h2>改定履歴</h2>
          <ul className="revisions">
            {meta.revisionHistory.map((r, i) => (
              <li key={i}>
                <b>{r.effectiveOn}</b> {r.summary}
                {r.sourceUrl && (
                  <>
                    {' '}
                    <a href={r.sourceUrl}>出典↗</a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>出典（一次資料）</h2>
        <Sources sources={meta.sources} />
        <p className="disclaimer">
          ※本データは上記を編集・加工して作成したものであり、出典元機関が作成・公表したものではありません。
        </p>
      </section>

      {meta.notes.length > 0 && (
        <section>
          <h2>注意事項</h2>
          <ul>
            {meta.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>
      )}

      <p>
        <Link to="/datasets">← データセット一覧</Link>
      </p>
    </>
  )
}
