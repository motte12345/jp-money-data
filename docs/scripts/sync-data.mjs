// リポジトリの data/ を docs/src/_data/ へ複製する（import.meta.glob で読むため）。
// 正本は ../data。src/_data は .gitignore 済み。
import { cpSync, rmSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = join(here, '..', '..', 'data')
const dest = join(here, '..', 'src', '_data')

rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })
console.log(`synced data → ${dest}`)
