import { describe, it, expect } from 'vitest'
import { resolveSlice, currentSlice } from '../src/core/resolve'
import type { Dataset } from '../src/core/types'

// 2スライスの合成データ（境界テスト用）
const ds: Dataset<{ v: number }> = {
  meta: {
    id: 'test',
    name: 'test',
    nameEn: 'test',
    category: 'tax',
    description: 't',
    unit: 'JPY',
    updateCycle: 'on-revision',
    updateMonth: null,
    sources: [
      { title: 't', url: 'https://example.com', publisher: 'x', license: 'PDL-1.0', accessedAt: '2026-07-03' },
    ],
    revisionHistory: [],
    notes: [],
  },
  slices: [
    {
      effectiveFrom: '2020-01-01',
      effectiveTo: '2025-12-31',
      sources: [
        { title: 't', url: 'https://example.com', publisher: 'x', license: 'PDL-1.0', accessedAt: '2026-07-03' },
      ],
      verifiedAt: '2026-07-03',
      values: { v: 1 },
    },
    {
      effectiveFrom: '2026-01-01',
      effectiveTo: null,
      sources: [
        { title: 't', url: 'https://example.com', publisher: 'x', license: 'PDL-1.0', accessedAt: '2026-07-03' },
      ],
      verifiedAt: '2026-07-03',
      values: { v: 2 },
    },
  ],
}

describe('resolveSlice', () => {
  it('effectiveFrom 当日は該当スライス', () => {
    expect(resolveSlice(ds, '2020-01-01')?.values.v).toBe(1)
    expect(resolveSlice(ds, '2026-01-01')?.values.v).toBe(2)
  })
  it('effectiveTo 当日は該当スライス（境界を含む）', () => {
    expect(resolveSlice(ds, '2025-12-31')?.values.v).toBe(1)
  })
  it('現行スライスは未来日でも該当', () => {
    expect(resolveSlice(ds, '2099-01-01')?.values.v).toBe(2)
  })
  it('収録範囲より前は null', () => {
    expect(resolveSlice(ds, '2019-12-31')).toBeNull()
  })
  it('不正な日付形式は RangeError', () => {
    expect(() => resolveSlice(ds, '2026/01/01')).toThrow(RangeError)
    expect(() => resolveSlice(ds, 'yesterday')).toThrow(RangeError)
  })
})

describe('currentSlice', () => {
  it('effectiveTo=null のスライスを返す', () => {
    expect(currentSlice(ds).values.v).toBe(2)
  })
})
