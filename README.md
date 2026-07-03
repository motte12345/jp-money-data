# jp-money-data

日本の生活マネー制度パラメータ（自動車税・軽自動車税・重量税・厚生年金・雇用保険・退職所得税
など）を、**出典URL・検証日・有効期間・改定履歴つきの JSON + TypeScript 型**として提供する OSS です。

- **データ = CC BY 4.0 / コード = MIT**（デュアルライセンス）
- npm で `npm install` するだけ。API キー・登録・課金は一切なし
- 毎年改定される「制度の現在値」を、過去スライス・改定履歴つきで機械可読に

> なぜ作ったか: 料率表・等級表は PDF/HTML に散在し、改定履歴を構造化した公開物は存在しません
> （data.go.jp で「自賠責」は0件、GitHub で「標準報酬月額」はOCR変換リポジトリが出るほど）。
> 制度パラメータの「現在値＋過去＋出典」を一箇所に集約します。

## Install

```bash
npm install jp-money-data
```

## Usage

```ts
import { koyoHokenKihonTeate, currentSlice, resolveSlice } from 'jp-money-data'

// 現行スライス（effectiveTo === null）
const now = currentSlice(koyoHokenKihonTeate)
console.log(now.values.teateUpper.under30) // 7255（令和7年8月〜）

// 基準日で解決（過去日の値も引ける）
const at = resolveSlice(koyoHokenKihonTeate, '2025-09-01')
console.log(at?.effectiveFrom) // '2025-08-01'
```

データセット単位のサブパス import（tree-shaking）:

```ts
import { koseiNenkin } from 'jp-money-data/datasets/kosei-nenkin'
```

CDN（jsDelivr・生JSON）:

```
https://cdn.jsdelivr.net/npm/jp-money-data@0/data/labor/koyo-hoken-kihon-teate.json
```

## データ構造

各データセットは `meta`（出典・検証日・更新周期・改定履歴）と `slices`（有効期間つきの値）から成ります。

- 金額は**整数円**（上限なしは `null`）、率は**小数**（18.3% → `0.183`）、日付は `YYYY-MM-DD`
- スライスは**追記のみ**。改定時は現行スライスに `effectiveTo` を入れ、新スライスを追加
- 全データセットに**現行スライスが必ず1本**（`effectiveTo: null`）

型と検証（ajv スキーマ + スライス不変条件 + アンカー値テスト）は CI で保証しています。

## 収録データセット（Phase 1・13本）

| category | id | 内容 |
|---|---|---|
| tax | jidosha-zei-shubetsuwari | 自動車税種別割（自家用乗用・経年重課） |
| tax | kei-jidosha-zei | 軽自動車税種別割（四輪＋二輪5区分・新基準原付） |
| tax | jidosha-juryo-zei | 自動車重量税（継続2年・乗用/軽/二輪） |
| tax | shaken-tesuryo | 自動車検査手数料（二輪継続・持込。2026-04改定） |
| tax | taishoku-shotoku-zei | 退職所得の税（控除・速算表・住民税6%/4%分離） |
| social-insurance | hyojun-hoshu-getsugaku | 標準報酬月額 等級表（健保50等級＋厚年32等級枠） |
| social-insurance | kyokai-kenpo-ryoritsu | 協会けんぽ 47都道府県 健康保険料率＋介護＋子育て支援金（令和8年度） |
| social-insurance | kosei-nenkin | 厚生年金料率・標準報酬月額上下限 |
| social-insurance | shobyo-teate-params | 傷病手当金の計算パラメータ（2/3・法定端数・通算18ヶ月） |
| labor | koyo-hoken-kihon-teate | 雇用保険 基本手当の上限下限・給付率 |
| labor | shotei-kyufu-nissu | 基本手当の所定給付日数 |
| labor | ikuji-kyugyo-kyufu | 育児休業給付・出産関連給付の上限額 |
| subsidy | kyuto-shoene-hojokin | 給湯省エネ・住宅省エネ補助金（給湯機器） |

許諾調整中（GIROJ 自賠責）・今後追加のデータセットは [CHANGELOG.md](./CHANGELOG.md) を参照。

## ライセンスと出典 / License & attribution

Dual-licensed: **data under CC BY 4.0**, **code under MIT**. Each dataset carries its primary
sources in `meta.sources[]`. When redistributing, follow the attribution format in
[NOTICE.md](./NOTICE.md). This data is **edited/adapted** from the cited sources and is **not**
an official government work.

## Disclaimer

正確性の確保に努めていますが**無保証**です。業務利用時は必ず一次資料（`meta.sources`）で
確認してください。本データは制度の解釈を提供するものではありません。

## Contributing / development

```bash
npm install
npm run validate   # ajv スキーマ + スライス不変条件
npm run generate   # data/*.json → packages/jp-money-data/src/generated/*.ts
npm run build      # generate → tsup（ESM+CJS+d.ts）
npm test           # Vitest（resolve / 不変条件 / アンカー値）
```

データの正本は `data/**/*.json`。TypeScript（`src/generated/`）は生成物なので手で編集しないでください。
