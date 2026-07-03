// このファイルは scripts/build-package.mjs が data/*.json から自動生成します。手で編集しないこと。
// 生成物は .gitignore せずコミットする（差分レビュー可能にするため。設計書§11）。
import type { Dataset } from '../core/types'
import type { KoyoHokenKihonTeateValues } from '../datasets/koyo-hoken-kihon-teate'

export const koyoHokenKihonTeate: Dataset<KoyoHokenKihonTeateValues> = {
  "meta": {
    "id": "koyo-hoken-kihon-teate",
    "name": "雇用保険 基本手当の上限・下限と給付率",
    "nameEn": "Employment insurance basic allowance (caps, floors and benefit rate)",
    "category": "labor",
    "description": "雇用保険の基本手当における賃金日額・基本手当日額の上限下限（年齢区分別）と、賃金日額から基本手当日額を求める給付率の逓減式。毎年8月1日に改定。",
    "unit": "JPY_PER_DAY",
    "updateCycle": "yearly",
    "updateMonth": 8,
    "sources": [
      {
        "title": "令和7年8月からの基本手当日額等の変更",
        "url": "https://www.mhlw.go.jp/content/001520021.pdf",
        "publisher": "厚生労働省",
        "license": "PDL-1.0",
        "accessedAt": "2026-07-03"
      }
    ],
    "revisionHistory": [
      {
        "effectiveOn": "2025-08-01",
        "summary": "令和7年8月改定（賃金日額・基本手当日額の上限下限を改定）",
        "sourceUrl": "https://www.mhlw.go.jp/content/001520021.pdf"
      }
    ],
    "notes": [
      "年齢区分は賃金日額・基本手当日額の上限にのみ影響。給付率カーブは under30/a30to44/a45to59 が共通、a60to64 のみ80%→45%逓減。",
      "現行スライス（2025-08-01〜）の名目適用期間は2026-07-31まで。2026-08-01改定値（7月下旬公表）を確定次第、本スライスに effectiveTo を入れて新スライスを追加する。",
      "給付率式: 一般 y=0.8w−0.3×((w−5340)/7800)×w（w:5340〜13140）／60-64歳 y=min(0.8w−0.35×((w−5340)/6460)×w, 0.05w+4720)。"
    ]
  },
  "slices": [
    {
      "effectiveFrom": "2025-08-01",
      "effectiveTo": null,
      "sources": [
        {
          "title": "令和7年8月からの基本手当日額等の変更",
          "url": "https://www.mhlw.go.jp/content/001520021.pdf",
          "publisher": "厚生労働省",
          "license": "PDL-1.0",
          "accessedAt": "2026-07-03"
        }
      ],
      "verifiedAt": "2026-07-03",
      "values": {
        "chinginUpper": {
          "under30": 14510,
          "a30to44": 16110,
          "a45to59": 17740,
          "a60to64": 16940
        },
        "chinginLower": 3014,
        "teateUpper": {
          "under30": 7255,
          "a30to44": 8055,
          "a45to59": 8870,
          "a60to64": 7623
        },
        "teateLower": 2411,
        "brackets": {
          "under30": [
            {
              "lower": 0,
              "upper": 5340,
              "exclusiveUpper": true,
              "formula": {
                "kind": "rate",
                "rate": 0.8
              },
              "label": "給付率80%"
            },
            {
              "lower": 5340,
              "upper": 13140,
              "exclusiveUpper": false,
              "formula": {
                "kind": "taper",
                "base": 5340,
                "divisor": 7800,
                "coef": 0.3
              },
              "label": "80%→50%の逓減"
            },
            {
              "lower": 13140,
              "upper": null,
              "exclusiveUpper": false,
              "formula": {
                "kind": "rate",
                "rate": 0.5
              },
              "label": "給付率50%"
            }
          ],
          "a30to44": [
            {
              "lower": 0,
              "upper": 5340,
              "exclusiveUpper": true,
              "formula": {
                "kind": "rate",
                "rate": 0.8
              },
              "label": "給付率80%"
            },
            {
              "lower": 5340,
              "upper": 13140,
              "exclusiveUpper": false,
              "formula": {
                "kind": "taper",
                "base": 5340,
                "divisor": 7800,
                "coef": 0.3
              },
              "label": "80%→50%の逓減"
            },
            {
              "lower": 13140,
              "upper": null,
              "exclusiveUpper": false,
              "formula": {
                "kind": "rate",
                "rate": 0.5
              },
              "label": "給付率50%"
            }
          ],
          "a45to59": [
            {
              "lower": 0,
              "upper": 5340,
              "exclusiveUpper": true,
              "formula": {
                "kind": "rate",
                "rate": 0.8
              },
              "label": "給付率80%"
            },
            {
              "lower": 5340,
              "upper": 13140,
              "exclusiveUpper": false,
              "formula": {
                "kind": "taper",
                "base": 5340,
                "divisor": 7800,
                "coef": 0.3
              },
              "label": "80%→50%の逓減"
            },
            {
              "lower": 13140,
              "upper": null,
              "exclusiveUpper": false,
              "formula": {
                "kind": "rate",
                "rate": 0.5
              },
              "label": "給付率50%"
            }
          ],
          "a60to64": [
            {
              "lower": 0,
              "upper": 5340,
              "exclusiveUpper": true,
              "formula": {
                "kind": "rate",
                "rate": 0.8
              },
              "label": "給付率80%"
            },
            {
              "lower": 5340,
              "upper": 11800,
              "exclusiveUpper": false,
              "formula": {
                "kind": "taper60"
              },
              "label": "80%→45%の逓減"
            },
            {
              "lower": 11800,
              "upper": null,
              "exclusiveUpper": false,
              "formula": {
                "kind": "rate",
                "rate": 0.45
              },
              "label": "給付率45%"
            }
          ]
        }
      }
    }
  ]
} as const
