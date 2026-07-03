// このファイルは scripts/build-package.mjs が data/*.json から自動生成します。手で編集しないこと。
// 生成物は .gitignore せずコミットする（差分レビュー可能にするため。設計書§11）。
import type { Dataset } from '../core/types'
import type { JidoshaJuryoZeiValues } from '../datasets/jidosha-juryo-zei'

export const jidoshaJuryoZei: Dataset<JidoshaJuryoZeiValues> = {
  "meta": {
    "id": "jidosha-juryo-zei",
    "name": "自動車重量税（継続検査2年・自家用乗用）",
    "nameEn": "Vehicle weight tax (2-year continuation inspection, private passenger)",
    "category": "tax",
    "description": "自家用乗用車の継続検査（2年）時にかかる自動車重量税。エコカー外・当分の間税率。車両重量0.5t刻み×経年3区分。軽自動車を含む。",
    "unit": "JPY",
    "updateCycle": "on-revision",
    "updateMonth": null,
    "sources": [
      {
        "title": "自動車重量税額について",
        "url": "https://www.mlit.go.jp/jidosha/jidosha_fr1_000076.html",
        "publisher": "国土交通省",
        "license": "PDL-1.0",
        "accessedAt": "2026-07-03"
      }
    ],
    "revisionHistory": [],
    "notes": [
      "継続検査（車検）2年・自家用乗用・エコカー外（当分の間税率）の額。新車新規（3年）やエコカー減税適用車は別。",
      "13年経過・18年経過で税額が上がる（経年加算）。",
      "乗用は車両重量3,000kg帯までを収録（自家用乗用の一般的レンジ）。3,000kg超の帯は未収録。",
      "二輪: 軽二輪(126〜250cc)は新規届出時に1回のみ4,900円（車検がないため年間維持費ではない）。小型二輪(251cc〜)は継続検査(2年)で over250PerYear×2 を納付（〜12年3,800／13年超4,600／18年超5,000）。"
    ]
  },
  "slices": [
    {
      "effectiveFrom": "2021-05-01",
      "effectiveTo": null,
      "sources": [
        {
          "title": "自動車重量税額について",
          "url": "https://www.mlit.go.jp/jidosha/jidosha_fr1_000076.html",
          "publisher": "国土交通省",
          "license": "PDL-1.0",
          "accessedAt": "2026-07-03"
        }
      ],
      "verifiedAt": "2026-07-03",
      "values": {
        "passenger": [
          {
            "maxKg": 500,
            "normal": 8200,
            "over13y": 11400,
            "over18y": 12600
          },
          {
            "maxKg": 1000,
            "normal": 16400,
            "over13y": 22800,
            "over18y": 25200
          },
          {
            "maxKg": 1500,
            "normal": 24600,
            "over13y": 34200,
            "over18y": 37800
          },
          {
            "maxKg": 2000,
            "normal": 32800,
            "over13y": 45600,
            "over18y": 50400
          },
          {
            "maxKg": 2500,
            "normal": 41000,
            "over13y": 57000,
            "over18y": 63000
          },
          {
            "maxKg": 3000,
            "normal": 49200,
            "over13y": 68400,
            "over18y": 75600
          }
        ],
        "kei": {
          "normal": 6600,
          "over13y": 8200,
          "over18y": 8800
        },
        "bike": {
          "kei2OneTime": 4900,
          "over250PerYear": {
            "normal": 1900,
            "over13y": 2300,
            "over18y": 2500
          }
        }
      }
    }
  ]
} as const
