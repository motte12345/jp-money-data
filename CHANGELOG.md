# Changelog

このプロジェクトの変更履歴（[Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) 形式）。
制度改定の反映はここに記録し、npm のバージョン（改定=minor、誤植修正=patch）と対応させる。

## [0.1.0] - 2026-07-05

### Added

- モノレポ骨組み・共通メタスキーマ（`core/types.ts` + `schemas/dataset.schema.json`）。
- 検証パイプライン（`scripts/validate.mjs`：ajv スキーマ + スライス不変条件）と
  JSON→TS 生成（`scripts/build-package.mjs`）。
- `resolveSlice` / `currentSlice`（`core/resolve.ts`）。
- データセット11本:
  - tax: `jidosha-zei-shubetsuwari` / `kei-jidosha-zei`（四輪＋二輪5区分＋新基準原付）/
    `jidosha-juryo-zei`（乗用＋軽＋二輪）/ `shaken-tesuryo`（二輪継続検査手数料2,100・2026-04改定）/
    `taishoku-shotoku-zei`（住民税6%/4%分離）
  - social-insurance: `kosei-nenkin` / `shobyo-teate-params`（傷病手当金 2/3・法定端数・通算18ヶ月・320,000特例）
  - labor: `koyo-hoken-kihon-teate`（2025-08-01 スライス）/ `shotei-kyufu-nissu` /
    `ikuji-kyugyo-kyufu`（育休給付上限・出産育児一時金50万/48.8万）
  - subsidy: `kyuto-shoene-hojokin`（給湯省エネ2026＋みらいエコ住宅2026）
  - social-insurance（追加）: `hyojun-hoshu-getsugaku`（標準報酬月額 全50等級＋厚年32等級枠）/
    `kyokai-kenpo-ryoritsu`（47都道府県 健康保険料率＋介護1.62%＋子ども子育て支援金0.23%・令和8年度）
- 全出典URL（15件）を live 検証済み（link-check）。値域サニティテスト（率は0..1・金額は非負整数）を追加。
- **#5/#6 の一次確認**: 協会けんぽ 令和8年度 保険料額表PDFを `pdftotext` で取得。標準報酬50等級は
  アンカー6点一致＋区間連続性を検証。47都道府県料率は各県の公式PDFを機械抽出し Web一覧と二重照合して全一致を確認。
- `shotei-kyufu-nissu` の `ippan`/`tokutei` を位置配列からラベル付きオブジェクト（under1y/y1to10/… , m6to1y/…）へ変更
  （自己記述的にし、npm 消費者と docs 表示の両方で被保険者期間の意味を明確化）。
- **docs サイト**（`docs/`・vite-react-ssg）: 全13データセットの早見表・出典・改定履歴・取得方法・JSON-LD(Dataset)
  を全ルート SSG で公開する構成を追加（トップ/一覧/詳細×13/使い方/スキーマ/ライセンス/更新履歴/about・計20ページ）。

### Pending（次パス）

- `jibaiseki-hokenryo`（GIROJ 許諾ゲート後。新旧スライスの値は 17§9 で確認済み）＝Phase 1 の残データはこれのみ。
- 個別 values スキーマ（`schemas/values/*.json`）。docs サイト（Phase 1c）。
