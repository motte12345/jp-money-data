# jp-money-data

日本の生活マネー制度パラメータ（自動車税・軽自動車税・重量税・厚生年金・雇用保険・退職所得税
など）を、**出典URL・検証日・有効期間・改定履歴つきの JSON + TypeScript 型**で提供します。

- **データ = CC BY 4.0 / コード = MIT**
- `npm install` するだけ。API キー・登録・課金なし
- 毎年改定される「制度の現在値」を、過去スライス・改定履歴つきで機械可読に

```bash
npm install jp-money-data
```

```ts
import { koyoHokenKihonTeate, currentSlice, resolveSlice } from 'jp-money-data'

currentSlice(koyoHokenKihonTeate).values.teateUpper.under30 // 7255（令和7年8月〜）
resolveSlice(koyoHokenKihonTeate, '2025-09-01')?.effectiveFrom // '2025-08-01'

// データセット単位のサブパス import（tree-shaking）
import { koseiNenkin } from 'jp-money-data/datasets/kosei-nenkin'
```

CDN（jsDelivr・生JSON）:

```
https://cdn.jsdelivr.net/npm/jp-money-data@0/data/labor/koyo-hoken-kihon-teate.json
```

## データ構造

各データセットは `meta`（出典・検証日・更新周期・改定履歴）と `slices`（有効期間つきの値）から成ります。
金額は整数円（上限なしは `null`）、率は小数（18.3% → `0.183`）、日付は `YYYY-MM-DD`。改定時は現行スライスに
`effectiveTo` を入れて新スライスを追加します（追記のみ）。

## ライセンスと出典

Dual-licensed: **data = CC BY 4.0**, **code = MIT**。各データセットは `meta.sources[]` に一次資料を持ちます。
再配布・引用時は出典表記（本データは一次資料を編集・加工したものであり官公庁の作成物ではない旨）を明記してください。

## 免責

正確性の確保に努めていますが**無保証**です。業務利用時は必ず一次資料（`meta.sources`）で確認してください。

詳細・開発方法・全データセット一覧はリポジトリの README / CHANGELOG / NOTICE を参照してください。
