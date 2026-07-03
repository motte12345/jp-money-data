import { Link } from 'react-router-dom'
import Head from '../components/Head'

export default function NotFoundPage() {
  return (
    <>
      <Head title="ページが見つかりません | jp-money-data" description="お探しのページは見つかりませんでした。" path="/404" />
      <h1>404 — ページが見つかりません</h1>
      <p>
        お探しのページは見つかりませんでした。<Link to="/">トップ</Link>または
        <Link to="/datasets">データセット一覧</Link>へどうぞ。
      </p>
    </>
  )
}
