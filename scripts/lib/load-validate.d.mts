// load-validate.mjs の型宣言（テストからの型付き import 用）。
export interface DatasetEntry {
  path: string
  relPath: string
  data: unknown
}
export interface ValidateResult {
  relPath: string
  errors: string[]
}
export function listDataFiles(dir?: string): string[]
export function loadDatasets(): DatasetEntry[]
export function validateAll(
  entries?: DatasetEntry[],
): { ok: boolean; results: ValidateResult[] }
export const ROOT: string
export const DATA_DIR: string
