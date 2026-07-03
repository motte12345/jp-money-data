import { Link } from 'react-router-dom'
import Head from '../components/Head'
import { NPM } from '../site'

export default function AboutPage() {
  return (
    <>
      <Head
        title="このプロジェクトについて | jp-money-data"
        description="jp-money-data は日本の生活マネー制度パラメータを出典・改定履歴つき JSON/TypeScript で配布する OSS です。検証ポリシーと更新方針。"
        path="/about/"
      />
      <h1>このプロジェクトについて</h1>
      <p>
        <b>jp-money-data</b> は、日本の税・社会保険・労働保険・補助金などの制度パラメータを、
        <b>出典URL・検証日・有効期間・改定履歴つき</b>の機械可読データ（JSON + TypeScript 型）として
        公開する OSS です。開発者が一次資料の PDF を読む工数を省き、毎年改定される制度の現在値を
        <code>npm install</code> だけで参照できるようにすることを目的としています。
      </p>

      <h2>検証ポリシー</h2>
      <ul>
        <li>すべての値に一次資料（官公庁・法令・公的機関の公表資料）の URL と確認日を付与します。</li>
        <li>公表されている計算例・代表値をアンカー値テストとして CI に組み込み、改定・誤植を検知します。</li>
        <li>金額は整数円・率は小数・日付は <code>YYYY-MM-DD</code> に正規化し、スキーマ検証で不変条件を保証します。</li>
        <li>出典URLの死活監視を定期実行し、リンク切れ・古い検証日を検出します。</li>
      </ul>

      <h2>更新方針</h2>
      <p>
        制度改定時は、現行スライスに終了日を設定し新しいスライスを追記します（過去日の計算互換を保つため、
        既存の値は誤植修正を除き変更しません）。改定の反映は <Link to="/changelog">更新履歴</Link> に記録します。
      </p>

      <h2>運営者・連絡先</h2>
      <p>
        本プロジェクトは個人により非営利で運営される OSS です（広告・アフィリエイトは掲載しません）。
        データの誤りの報告・改善提案・出典元からの照会は、公開後の GitHub リポジトリの Issue で受け付けます
        （リポジトリには「誤り報告」テンプレートを用意します）。npm:{' '}
        <a href={`https://www.npmjs.com/package/${NPM}`}>{NPM}</a>。
      </p>

      <h2>ライセンス</h2>
      <p>
        データ = CC BY 4.0 / コード = MIT。再配布・引用時の出典表記の形式と、各データセットの一次資料一覧は{' '}
        <Link to="/docs/license">ライセンスと出典</Link> を参照してください。
      </p>
    </>
  )
}
