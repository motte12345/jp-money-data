// データセットの values（データセット毎に形が異なる）を汎用的に表へ描画する。
// - オブジェクトの配列 → データ表（列 = キーの和集合）
// - 配列（プリミティブ） → カンマ区切り
// - オブジェクト → キー/値の表
// - 数値 → 3桁区切り（整数かつ1000以上）、率などの小数はそのまま

// 1000以上の整数は3桁区切り、小数（率）はそのまま表示。
// 注意: unit を持たない汎用整形のため、将来 fiscalYear やコード値のような「桁区切りしたくない整数」を
// 含むデータセットを追加する場合は、そのフィールドを文字列で持たせるか本関数に例外を設けること。
function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) >= 1000) return n.toLocaleString('en-US')
  return String(n)
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function ArrayNode({ arr }: { arr: unknown[] }) {
  if (arr.length === 0) return <span className="muted">（なし）</span>
  if (arr.every(isRecord)) {
    const cols: string[] = []
    for (const item of arr) {
      for (const k of Object.keys(item)) if (!cols.includes(k)) cols.push(k)
    }
    return (
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {arr.map((item, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td key={c}>
                    <ValueNode value={(item as Record<string, unknown>)[c]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <span>
      {arr.map((v, i) => (
        <span key={i}>
          {i > 0 ? ', ' : ''}
          <ValueNode value={v} />
        </span>
      ))}
    </span>
  )
}

function ObjectTable({ obj }: { obj: Record<string, unknown> }) {
  return (
    <table className="kv-table">
      <tbody>
        {Object.keys(obj).map((k) => (
          <tr key={k}>
            <th>{k}</th>
            <td>
              <ValueNode value={obj[k]} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function ValueNode({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <span className="muted">—</span>
  if (typeof value === 'number') return <>{fmt(value)}</>
  if (typeof value === 'string') return <>{value}</>
  if (typeof value === 'boolean') return <>{value ? 'true' : 'false'}</>
  if (Array.isArray(value)) return <ArrayNode arr={value} />
  if (isRecord(value)) return <ObjectTable obj={value} />
  return <>{String(value)}</>
}
