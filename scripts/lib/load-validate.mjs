// 共有: データセット JSON の読み込み・ajv スキーマ検証・スライス不変条件チェック。
// validate.mjs（検証のみ）と build-package.mjs（検証→生成）の両方から使う。
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const ROOT = join(__dirname, '..', '..')
export const DATA_DIR = join(ROOT, 'data')
const SCHEMA_PATH = join(ROOT, 'schemas', 'dataset.schema.json')

// data 配下の .json を再帰的に列挙（LICENSE 等の非 JSON は除外）。
export function listDataFiles(dir = DATA_DIR) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...listDataFiles(p))
    else if (name.endsWith('.json')) out.push(p)
  }
  return out.sort()
}

/** 各ファイルを { path, relPath, data } で読み込む。 */
export function loadDatasets() {
  return listDataFiles().map((path) => ({
    path,
    relPath: relative(ROOT, path).replace(/\\/g, '/'),
    data: JSON.parse(readFileSync(path, 'utf8')),
  }))
}

function buildValidator() {
  const ajv = new Ajv({ allErrors: true, strict: false })
  addFormats(ajv)
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'))
  return ajv.compile(schema)
}

const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)

/**
 * スライスの不変条件（設計書§9.1 の規約 / §15）。
 * ①現行スライス（effectiveTo=null）がちょうど1本
 * ②effectiveFrom 昇順・effectiveFrom < effectiveTo
 * ③期間の重複・隙間なし（隣接スライスは effectiveTo の翌日 = 次の effectiveFrom）
 * ④meta.id とファイル名の整合
 */
function checkInvariants(entry) {
  const errs = []
  const { data, relPath } = entry
  const slices = data.slices ?? []

  const fileId = relPath.split('/').pop().replace(/\.json$/, '')
  if (data.meta?.id && data.meta.id !== fileId) {
    errs.push(`meta.id "${data.meta.id}" がファイル名 "${fileId}" と不一致`)
  }

  const current = slices.filter((s) => s.effectiveTo === null)
  if (current.length !== 1) {
    errs.push(`現行スライス（effectiveTo=null）は1本必須だが ${current.length} 本`)
  }

  for (const s of slices) {
    if (s.effectiveTo !== null && isDate(s.effectiveFrom) && isDate(s.effectiveTo)) {
      if (!(s.effectiveFrom < s.effectiveTo)) {
        errs.push(`effectiveFrom(${s.effectiveFrom}) < effectiveTo(${s.effectiveTo}) が不成立`)
      }
    }
  }

  const sorted = [...slices].sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom))
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1]
    const cur = sorted[i]
    if (prev.effectiveTo === null) {
      errs.push(`現行スライス(${prev.effectiveFrom})より後に別スライス(${cur.effectiveFrom})が存在`)
      continue
    }
    const expectedNext = nextDay(prev.effectiveTo)
    if (cur.effectiveFrom !== expectedNext) {
      errs.push(
        `スライス連続性違反: ${prev.effectiveFrom}..${prev.effectiveTo} の次は ${expectedNext} であるべきだが ${cur.effectiveFrom}`,
      )
    }
  }
  return errs
}

function nextDay(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  dt.setUTCDate(dt.getUTCDate() + 1)
  return dt.toISOString().slice(0, 10)
}

/**
 * 全データセットを検証。{ ok, results:[{relPath, errors:[]}] } を返す。
 * schema エラーと不変条件エラーを両方集約。
 */
export function validateAll(entries = loadDatasets()) {
  const validate = buildValidator()
  const results = entries.map((entry) => {
    const errors = []
    if (!validate(entry.data)) {
      for (const e of validate.errors ?? []) {
        errors.push(`schema ${e.instancePath || '/'} ${e.message}`)
      }
    }
    errors.push(...checkInvariants(entry))
    return { relPath: entry.relPath, errors }
  })
  return { ok: results.every((r) => r.errors.length === 0), results }
}
