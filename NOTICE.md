# NOTICE — 出典表記 / Source attribution

本プロジェクトのデータ（`data/`）は、下記の一次資料を基に**編集・加工**して作成した
機械可読データセットです。**各機関が作成・公表したものではありません。**
データは CC BY 4.0、コードは MIT で提供します（`LICENSE` / `data/LICENSE`）。

## 出典表記の形式（再配布・引用時に使用）

公共データ利用規約（PDL1.0）由来のデータには、以下の形式で出典を記載してください。

```
出典: 「{資料名}」（{機関名}）（{一次資料URL}）、
公共データ利用規約（PDL1.0）（https://www.digital.go.jp/resources/open_data/public_data_license_v1.0）
（{accessedAt} に利用）
※本データは上記資料を基に編集・加工して作成したものであり、{機関名}が作成したものではありません。
```

著作権法13条により権利の目的とならない法令・告示由来の数値、および準政府機関の独自規約
（協会けんぽ等・出所明示による引用/転載可）由来のデータは、`meta.sources[].license` の区分に従います。

## 収録データセットの一次資料一覧

各データセットの正確な出典・URL・アクセス日は、対応する `data/**/<id>.json` の
`meta.sources[]` および `slices[].sources[]` を正とします（機械可読）。以下は一覧の要約です。

| dataset | 出典機関 | ライセンス区分 |
|---|---|---|
| tax/jidosha-zei-shubetsuwari | 総務省・地方税法 | copyright-free-art13 |
| tax/kei-jidosha-zei | 総務省・地方税法 | copyright-free-art13 |
| tax/jidosha-juryo-zei | 国土交通省 | PDL-1.0 |
| tax/shaken-tesuryo | 国土交通省（関東運輸局） | PDL-1.0 |
| tax/taishoku-shotoku-zei | 国税庁・所得税法 | copyright-free-art13 |
| social-insurance/hyojun-hoshu-getsugaku | 協会けんぽ・健康保険法40条別表 | copyright-free-art13 |
| social-insurance/kyokai-kenpo-ryoritsu | 全国健康保険協会（協会けんぽ） | quasi-govt-quote |
| social-insurance/kosei-nenkin | 日本年金機構・厚生労働省 | PDL-1.0 |
| social-insurance/shobyo-teate-params | 協会けんぽ・健康保険法99条 | quasi-govt-quote |
| labor/koyo-hoken-kihon-teate | 厚生労働省 | PDL-1.0 |
| labor/shotei-kyufu-nissu | 厚生労働省・雇用保険法 | copyright-free-art13 |
| labor/ikuji-kyugyo-kyufu | 厚生労働省・雇用保険法/健康保険法 | PDL-1.0 |
| subsidy/kyuto-shoene-hojokin | 経済産業省・国土交通省 | PDL-1.0 |

## 免責

正確性の確保に努めていますが、本データは**無保証**です（MIT / CC BY 4.0 の無保証条項）。
給与計算・保険実務等の業務利用時は、必ず `meta.sources` の一次資料で確認してください。
本データは法令・制度の解釈を提供するものではありません。
誤りを見つけた場合は GitHub Issue（誤り報告テンプレート）でお知らせください。
