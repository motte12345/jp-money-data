import { Link, Outlet } from 'react-router-dom'
import { NPM } from '../site'

export default function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link to="/" className="brand">
            jp-money-data
          </Link>
          <nav className="nav">
            <Link to="/datasets">データセット</Link>
            <Link to="/docs/getting-started">使い方</Link>
            <Link to="/docs/schema">スキーマ</Link>
            <Link to="/changelog">更新履歴</Link>
            <a href={`https://www.npmjs.com/package/${NPM}`}>npm</a>
          </nav>
        </div>
      </header>

      <main className="wrap main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p>
            データ = <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> / コード = MIT。
            各データは <Link to="/docs/license">出典</Link>を明示のうえ編集・加工したものであり、
            官公庁が作成・公表したものではありません。
          </p>
          <p className="disclaimer">
            正確性の確保に努めていますが無保証です。業務利用時は必ず一次資料で確認してください。
            本データは制度の解釈を提供するものではありません。
          </p>
          <p className="footer-links">
            <Link to="/about">運営者情報</Link> ・ <Link to="/docs/license">ライセンスと出典</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
