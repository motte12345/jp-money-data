// このファイルは scripts/build-package.mjs が data/*.json から自動生成します。手で編集しないこと。
// 生成物は .gitignore せずコミットする（差分レビュー可能にするため。設計書§11）。
import type { Dataset } from '../core/types'
import type { ShakenTesuryoValues } from '../datasets/shaken-tesuryo'

export const shakenTesuryo: Dataset<ShakenTesuryoValues> = {
  "meta": {
    "id": "shaken-tesuryo",
    "name": "自動車検査手数料（二輪・継続検査・持込）",
    "nameEn": "Vehicle inspection fee (motorcycle, continuation, bring-in)",
    "category": "tax",
    "description": "二輪の継続検査（持込・ユーザー車検）の法定検査手数料。印紙＋証紙の内訳を含む。2026年4月改定後の額。",
    "unit": "JPY",
    "updateCycle": "on-revision",
    "updateMonth": null,
    "sources": [
      {
        "title": "手数料一覧（自動車検査登録）",
        "url": "https://wwwtb.mlit.go.jp/kanto/content/000109105.pdf",
        "publisher": "国土交通省 関東運輸局",
        "license": "PDL-1.0",
        "accessedAt": "2026-07-03"
      }
    ],
    "revisionHistory": [
      {
        "effectiveOn": "2026-04-01",
        "summary": "二輪の継続検査（持込）検査手数料を1,800円から2,100円へ改定",
        "sourceUrl": null
      }
    ],
    "notes": [
      "持込（ユーザー車検）の検査手数料のみ。指定工場の保安基準適合証提出（1,200円級）や新規検査は別。",
      "多くのネット記事は改定前の1,800円のまま。2026-04改定後は2,100円（印紙600＋証紙1,500）。",
      "四輪の検査手数料は本データセットでは未収録（次パスで追加）。"
    ]
  },
  "slices": [
    {
      "effectiveFrom": "2026-04-01",
      "effectiveTo": null,
      "sources": [
        {
          "title": "手数料一覧（自動車検査登録）",
          "url": "https://wwwtb.mlit.go.jp/kanto/content/000109105.pdf",
          "publisher": "国土交通省 関東運輸局",
          "license": "PDL-1.0",
          "accessedAt": "2026-07-03"
        }
      ],
      "verifiedAt": "2026-07-03",
      "values": {
        "bikeContinuationBringIn": {
          "total": 2100,
          "inshi": 600,
          "shoshi": 1500
        }
      }
    }
  ]
} as const
