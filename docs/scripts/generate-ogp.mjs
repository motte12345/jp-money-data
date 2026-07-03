// OGP画像生成（1200x630 PNG → public/ogp.png）。SVG + sharp。
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const OUT = join(here, '..', 'public', 'ogp.png')
const W = 1200
const H = 630

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#12463b"/>
      <stop offset="100%" stop-color="#0a2c25"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g transform="translate(90,150)" opacity="0.14" font-family="monospace" font-size="26" fill="#7fe3cf">
    <text x="0" y="0">{ "meta": { "id": "koyo-hoken-kihon-teate",</text>
    <text x="0" y="40">  "sources": [ { "publisher": "厚生労働省" } ] },</text>
    <text x="0" y="80">  "slices": [ { "effectiveFrom": "2025-08-01",</text>
    <text x="0" y="120">    "values": { "teateUpper": { "under30": 7255 } } } ] }</text>
  </g>
  <text x="90" y="380" font-family="'Segoe UI','Hiragino Sans',sans-serif" font-size="88" font-weight="800" fill="#ffffff">jp-money-data</text>
  <text x="94" y="452" font-family="'Segoe UI','Hiragino Sans',sans-serif" font-size="38" font-weight="600" fill="#7fe3cf">日本の税・保険・給付の制度データを JSON で</text>
  <text x="94" y="516" font-family="'Segoe UI','Hiragino Sans',sans-serif" font-size="28" fill="#cfeae3">出典・改定履歴つき / CC BY 4.0 ・ MIT / npm install jp-money-data</text>
</svg>
`

await sharp(Buffer.from(svg)).png().toFile(OUT)
console.log(`ogp.png generated → ${OUT}`)
