import { describe, it, expect } from 'vitest'
import { currentSlice } from '../src/core/resolve'
import {
  jidoshaZeiShubetsuwari,
  keiJidoshaZei,
  jidoshaJuryoZei,
  koseiNenkin,
  koyoHokenKihonTeate,
  shoteiKyufuNissu,
  taishokuShotokuZei,
  shakenTesuryo,
  shobyoTeateParams,
  ikujiKyugyoKyufu,
  kyutoShoeneHojokin,
  hyojunHoshuGetsugaku,
  kyokaiKenpoRyoritsu,
} from '../src'

// 一次資料の代表値・計算例と突合する（設計書§15 アンカー値テスト）。
// 値が改定・誤植された場合にここが落ちる。

describe('自動車税種別割', () => {
  const v = currentSlice(jidoshaZeiShubetsuwari).values
  it('先頭帯（〜1000cc）の2019年10月以降税額 = 25,000', () => {
    expect(v.brackets[0]).toMatchObject({ maxCc: 1000, post201910: 25000, pre201909: 29500 })
  })
  it('最終帯は上限なし（maxCc=null）で 110,000 / 111,000', () => {
    const last = v.brackets[v.brackets.length - 1]!
    expect(last.maxCc).toBeNull()
    expect(last.post201910).toBe(110000)
  })
  it('重課ルールはガソリン13年・ディーゼル11年・HV/EV免除', () => {
    expect(v.surcharge).toMatchObject({ gasolineYears: 13, dieselYears: 11 })
    expect(v.surcharge.exemptFuels).toContain('ev')
  })
})

describe('軽自動車税種別割', () => {
  const v = currentSlice(keiJidoshaZei).values
  it('四輪自家用乗用 標準10,800 / 重課12,900', () => {
    expect(v.fourWheelPassenger).toEqual({ normal: 10800, heavy13y: 12900 })
  })
  it('二輪 全5区分: 50→2,000 / 90(乙)→2,000 / 125(甲)→2,400 / 250→3,600 / 251+(null)→6,000、新基準原付=2,000', () => {
    const amt = (maxCc: number | null) => v.twoWheel.brackets.find((b) => b.maxCc === maxCc)!.amount
    expect(amt(50)).toBe(2000)
    expect(amt(90)).toBe(2000)
    expect(amt(125)).toBe(2400)
    expect(amt(250)).toBe(3600)
    const kogata = v.twoWheel.brackets[v.twoWheel.brackets.length - 1]!
    expect(kogata.maxCc).toBeNull()
    expect(kogata.amount).toBe(6000)
    expect(v.twoWheel.shinKijunGentsuki).toBe(2000)
  })
})

describe('自動車重量税', () => {
  const v = currentSlice(jidoshaJuryoZei).values
  it('1.0t以下 継続2年 = 16,400（13年16,400→22,800）', () => {
    const b = v.passenger.find((x) => x.maxKg === 1000)!
    expect(b).toMatchObject({ normal: 16400, over13y: 22800, over18y: 25200 })
  })
  it('軽自動車 継続2年 = 6,600', () => {
    expect(v.kei.normal).toBe(6600)
  })
  it('二輪: 軽二輪 新規1回4,900、小型二輪 年額1,900（継続2年は×2=3,800）', () => {
    expect(v.bike.kei2OneTime).toBe(4900)
    expect(v.bike.over250PerYear.normal).toBe(1900)
    expect(v.bike.over250PerYear.normal * 2).toBe(3800)
  })
})

describe('厚生年金', () => {
  const v = currentSlice(koseiNenkin).values
  it('料率18.3%・上下限88,000〜650,000・32等級', () => {
    expect(v).toEqual({ rate: 0.183, monthlyMin: 88000, monthlyMax: 650000, grades: 32 })
  })
})

describe('雇用保険 基本手当', () => {
  const v = currentSlice(koyoHokenKihonTeate).values
  it('賃金日額上限（under30）14,510 / 基本手当日額上限 7,255', () => {
    expect(v.chinginUpper.under30).toBe(14510)
    expect(v.teateUpper.under30).toBe(7255)
  })
  it('給付率整合: 賃金日額上限 × 0.5 = 基本手当日額上限（一般区分）', () => {
    expect(Math.floor(v.chinginUpper.under30 * 0.5)).toBe(v.teateUpper.under30)
    expect(Math.floor(v.chinginUpper.a45to59 * 0.5)).toBe(v.teateUpper.a45to59)
  })
  it('60-64歳は45%で整合（16,940×0.45=7,623）', () => {
    expect(Math.floor(v.chinginUpper.a60to64 * 0.45)).toBe(v.teateUpper.a60to64)
  })
  it('下限 3,014×0.8=2,411', () => {
    expect(Math.floor(v.chinginLower * 0.8)).toBe(v.teateLower)
  })
})

describe('所定給付日数', () => {
  const v = currentSlice(shoteiKyufuNissu).values
  it('一般20年以上=150、1年未満は受給資格なし(null)', () => {
    expect(v.ippan).toEqual({ under1y: null, y1to10: 90, y10to20: 120, y20plus: 150 })
  })
  it('特定 45-59歳20年以上=330、30歳未満20年以上は存在せず(null)、就職困難45-64歳=360', () => {
    expect(v.tokutei.a45to59.y20plus).toBe(330)
    expect(v.tokutei.under30.y20plus).toBeNull()
    expect(v.konnan.a45to64).toBe(360)
  })
})

describe('退職所得の税', () => {
  const v = currentSlice(taishokuShotokuZei).values
  it('住民税は市6%・県4%の分離フィールド', () => {
    expect(v.shiminZeiRate).toBe(0.06)
    expect(v.kenminZeiRate).toBe(0.04)
  })
  it('住民税の分割端数処理: 課税654,000円 → 65,300円（一括×10%の65,400円とは99円ずれる）', () => {
    const base = 654000
    const shimin = Math.floor((base * v.shiminZeiRate + 1e-6) / 100) * 100
    const kenmin = Math.floor((base * v.kenminZeiRate + 1e-6) / 100) * 100
    expect(shimin).toBe(39200)
    expect(kenmin).toBe(26100)
    expect(shimin + kenmin).toBe(65300)
    // 誤った一括計算との差
    expect(Math.floor(base * 0.1)).toBe(65400)
  })
  it('退職所得控除の係数（20年以下40万・20年超基礎800万+70万）', () => {
    expect(v.kojo).toMatchObject({ under20PerYear: 400000, over20Base: 8000000, over20PerYear: 700000, min: 800000 })
  })
  it('所得税速算表の最上段は45%（控除4,796,000）', () => {
    const top = v.incomeTaxBrackets[v.incomeTaxBrackets.length - 1]!
    expect(top).toEqual({ upTo: null, rate: 0.45, deduction: 4796000 })
  })
})

describe('検査手数料', () => {
  const v = currentSlice(shakenTesuryo).values
  it('二輪 継続・持込 = 2,100（印紙600＋証紙1,500、2026-04改定）', () => {
    expect(v.bikeContinuationBringIn).toEqual({ total: 2100, inshi: 600, shoshi: 1500 })
    expect(v.bikeContinuationBringIn.inshi + v.bikeContinuationBringIn.shoshi).toBe(
      v.bikeContinuationBringIn.total,
    )
  })
})

describe('傷病手当金パラメータ', () => {
  const v = currentSlice(shobyoTeateParams).values
  it('給付2/3・除数30・全被保険者平均320,000・待期3・通算18ヶ月', () => {
    expect(v.benefitFraction).toEqual({ numerator: 2, denominator: 3 })
    expect(v.dailyDivisor).toBe(30)
    expect(v.zenhiHeikinCap).toBe(320000)
    expect(v.waitingDays).toBe(3)
    expect(v.tsusanMonths).toBe(18)
  })
  it('協会けんぽ計算例: 平均170,000円 → 日額3,780円（法定の段階丸め）', () => {
    const avg = 170000
    // ÷30 を10円単位で四捨五入
    const daily = Math.round(avg / v.dailyDivisor / 10) * 10
    expect(daily).toBe(5670)
    // ×2/3 を1円単位で四捨五入
    const benefit = Math.round((daily * v.benefitFraction.numerator) / v.benefitFraction.denominator)
    expect(benefit).toBe(3780)
  })
})

describe('育児休業給付・出産関連給付', () => {
  const v = currentSlice(ikujiKyugyoKyufu).values
  it('賃金日額上限16,110・出産育児一時金50万/48.8万', () => {
    expect(v.wageDailyCap).toBe(16110)
    expect(v.shussanIchijikin).toBe(500000)
    expect(v.shussanIchijikinNoHosho).toBe(488000)
  })
  it('月額上限の導出整合（賃金日額上限×日数×率）', () => {
    expect(Math.floor(v.wageDailyCap * 30 * 0.67)).toBe(v.ikukyuMonthlyCap67)
    expect(Math.floor(v.wageDailyCap * 30 * 0.5)).toBe(v.ikukyuMonthlyCap50)
    expect(Math.floor(v.wageDailyCap * 28 * 0.67)).toBe(v.shusseijiCap28d)
    expect(Math.floor(v.wageDailyCap * 28 * 0.13)).toBe(v.shienCap28d)
  })
})

describe('給湯省エネ補助金', () => {
  const v = currentSlice(kyutoShoeneHojokin).values
  it('給湯省エネ2026(エコキュート) 基本7万＋性能3万＋電温撤去2万、期限2026-12-31', () => {
    const p = v.programs.find((x) => x.id === 'kyuto-shoene-2026-ecocute')!
    expect(p.baseYen).toBe(70000)
    expect(p.performanceBonusYen).toBe(30000)
    expect(p.removalBonus).toContainEqual({ fromHeater: 'electric-tank', yen: 20000 })
    expect(p.applyDeadline).toBe('2026-12-31')
    expect(p.status).toBe('open')
  })
})

describe('標準報酬月額 等級表', () => {
  const v = currentSlice(hyojunHoshuGetsugaku).values
  it('健康保険は50等級', () => {
    expect(v.kenpo).toHaveLength(50)
  })
  it('アンカー6点が一次資料（令和8年度保険料額表）と一致', () => {
    const g = (n: number) => v.kenpo.find((x) => x.grade === n)!
    expect(g(1)).toEqual({ grade: 1, monthly: 58000, lower: 0, upper: 63000 })
    expect(g(5)).toEqual({ grade: 5, monthly: 98000, lower: 93000, upper: 101000 })
    expect(g(17)).toEqual({ grade: 17, monthly: 200000, lower: 195000, upper: 210000 })
    expect(g(22)).toEqual({ grade: 22, monthly: 300000, lower: 290000, upper: 310000 })
    expect(g(27)).toEqual({ grade: 27, monthly: 410000, lower: 395000, upper: 425000 })
    expect(g(50)).toEqual({ grade: 50, monthly: 1390000, lower: 1355000, upper: null })
  })
  it('等級は連番・monthly 単調増加・区間が連続（upper[n]===lower[n+1]）', () => {
    for (let i = 0; i < v.kenpo.length; i++) {
      const row = v.kenpo[i]!
      expect(row.grade).toBe(i + 1)
      if (i > 0) {
        const prev = v.kenpo[i - 1]!
        expect(row.monthly).toBeGreaterThan(prev.monthly)
        expect(prev.upper).toBe(row.lower) // 区間の連続性
      }
    }
    expect(v.kenpo[0]!.lower).toBe(0)
    expect(v.kenpo[49]!.upper).toBeNull()
  })
  it('厚生年金の枠は88,000〜650,000・32等級', () => {
    expect(v.kosei).toEqual({ minMonthly: 88000, maxMonthly: 650000, grades: 32 })
  })
})

describe('協会けんぽ 都道府県別料率（令和8年度）', () => {
  const v = currentSlice(kyokaiKenpoRyoritsu).values
  it('47都道府県・コードは01〜47で一意', () => {
    expect(v.prefs).toHaveLength(47)
    const codes = v.prefs.map((p) => p.code)
    expect(new Set(codes).size).toBe(47)
    expect(codes[0]).toBe('01')
    expect(codes[46]).toBe('47')
  })
  it('主要県の料率（PDFから機械抽出・二重照合済み）', () => {
    const r = (code: string) => v.prefs.find((p) => p.code === code)!
    expect(r('13').name).toBe('東京都')
    expect(r('13').healthRate).toBe(0.0985)
    expect(r('01').healthRate).toBe(0.1028) // 北海道
    expect(r('41').healthRate).toBe(0.1055) // 佐賀（最高）
    expect(r('15').healthRate).toBe(0.0921) // 新潟（最低）
    expect(r('47').healthRate).toBe(0.0944) // 沖縄
  })
  it('介護1.62%・子ども子育て支援金0.23%（適用2026-04-01）、全料率は 9%〜11% の妥当域', () => {
    expect(v.kaigoRate).toBe(0.0162)
    expect(v.kosodateShienRate).toEqual({ rate: 0.0023, effectiveFrom: '2026-04-01' })
    for (const p of v.prefs) {
      expect(p.healthRate).toBeGreaterThan(0.09)
      expect(p.healthRate).toBeLessThan(0.11)
    }
  })
})
