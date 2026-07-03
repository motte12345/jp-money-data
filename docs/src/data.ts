// データセットの読み込み。正本は ../data で、scripts/sync-data.mjs が ./_data へ複製する。
// import.meta.glob で全 JSON を読み、型を付けて公開する。

export type SourceLicense =
  | 'PDL-1.0'
  | 'copyright-free-art13'
  | 'permission-required'
  | 'quasi-govt-quote'

export interface SourceRef {
  title: string
  url: string
  publisher: string
  license: SourceLicense
  accessedAt: string
}

export interface Revision {
  effectiveOn: string
  summary: string
  sourceUrl: string | null
}

export type DatasetCategory =
  | 'tax'
  | 'compulsory-insurance'
  | 'social-insurance'
  | 'labor'
  | 'subsidy'

export interface DatasetMeta {
  id: string
  name: string
  nameEn: string
  category: DatasetCategory
  description: string
  unit: string
  updateCycle: 'yearly' | 'on-revision'
  updateMonth: number | null
  sources: SourceRef[]
  revisionHistory: Revision[]
  notes: string[]
}

export interface TimeSlice {
  effectiveFrom: string
  effectiveTo: string | null
  sources: SourceRef[]
  verifiedAt: string
  values: unknown
}

export interface Dataset {
  meta: DatasetMeta
  slices: TimeSlice[]
}

const modules = import.meta.glob<Dataset>('./_data/**/*.json', {
  eager: true,
  import: 'default',
})

export const datasets: Dataset[] = Object.values(modules).sort((a, b) =>
  a.meta.id.localeCompare(b.meta.id),
)

export const datasetById = new Map(datasets.map((d) => [d.meta.id, d]))

/** 現行スライス（effectiveTo === null）。データ規約上必ず1本存在する。 */
export function currentSlice(d: Dataset): TimeSlice {
  return d.slices.find((s) => s.effectiveTo === null) ?? d.slices[d.slices.length - 1]
}

export const CATEGORY_LABELS: Record<DatasetCategory, string> = {
  tax: '税',
  'compulsory-insurance': '強制保険',
  'social-insurance': '社会保険',
  labor: '労働・雇用保険',
  subsidy: '補助金',
}

export const LICENSE_LABELS: Record<SourceLicense, string> = {
  'PDL-1.0': '公共データ利用規約(PDL1.0)',
  'copyright-free-art13': '著作権法13条(権利の目的とならない)',
  'permission-required': '要事前許諾',
  'quasi-govt-quote': '準政府機関の独自規約(出所明示で利用)',
}
