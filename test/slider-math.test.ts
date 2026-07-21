import { describe, it, expect } from 'vitest'
import { applySliderMin, shiftForHiddenMin, sliderValueToEntity } from '../src/scripts/slider-math'

// ============================================================================
// Table-driven tests for the pure math extracted from initializeConfig().
// Expected values are the CURRENT formulas' outputs (characterization) — the
// DOM tests already pin the per-entity end results; these pin the helpers
// directly so future refactors can lean on them.
// ============================================================================

describe('applySliderMin', () => {
    const cases: Array<[val: number, sliderMin: number, expected: number]> = [
        [0, 0, 0],
        [50, 0, 50],
        [100, 0, 100],
        [0, 20, 20],      // floor: value 0 rests at sliderMin
        [50, 20, 60],     // 50 * 0.8 + 20
        [100, 20, 100],
        [25, 10, 32.5],   // 25 * 0.9 + 10
        [-5, 20, 20],     // below-zero input clamps to the floor
        [55, 20, 64],     // #48 humidifier case from the attribute tests
    ]
    for (const [val, sliderMin, expected] of cases) {
        it(`(${val}, sliderMin ${sliderMin}) => ${expected}`, () => {
            expect(applySliderMin(val, sliderMin)).toBeCloseTo(expected, 10)
        })
    }

    it('is identity for sliderMin 0 across the whole range', () => {
        for (let v = 0; v <= 100; v += 12.5) {
            expect(applySliderMin(v, 0)).toBe(v)
        }
    })
})

describe('shiftForHiddenMin', () => {
    const cases: Array<[min: number, max: number, val: number, emax: number, eval_: number]> = [
        [0, 100, 50, 100, 50],
        [10, 100, 50, 90, 40],    // brightness + min 10 (pinned 40 / 44.44% case)
        [30, 70, 55, 40, 25],     // humidifier 30..70 at 55 (pinned attribute case)
        [153, 500, 300, 347, 147], // light temperature mireds (pinned 147 / 42.36% case)
        [10, 50, 25, 40, 15],     // input_number entity min shift
    ]
    for (const [min, max, val, emax, eval_] of cases) {
        it(`(min ${min}, max ${max}, val ${val}) => max ${emax} / val ${eval_}`, () => {
            expect(shiftForHiddenMin(min, max, val)).toEqual({ max: emax, val: eval_ })
        })
    }
})

// ============================================================================
// F-11: sliderValueToEntity — the single slider-space -> entity-value transform.
// Extracted verbatim from setValue() so the showValue drag label and the service
// call cannot disagree. These pin the ORDER of operations (+min -> sliderMin
// rescale -> clamp -> inverse mirror), which is existing behavior, not a choice.
// ============================================================================
describe('sliderValueToEntity (F-11)', () => {
    const cfg = (over: Partial<{ showMin: boolean; min: number; max: number; sliderMin: number; inverse: boolean }> = {}) =>
        ({ showMin: false, min: 0, max: 100, sliderMin: 0, inverse: false, ...over })

    it('restores the hidden minimum (the F-11 bug: label read low by exactly min)', () => {
        // Reproductions from the maintainer's dashboard, FABLE_F11_PLAN table.
        expect(sliderValueToEntity(15, cfg({ min: 50 }))).toBe(65)
        expect(sliderValueToEntity(50, cfg({ min: 10 }))).toBe(60)
        expect(sliderValueToEntity(55, cfg({ min: 5 }))).toBe(60)
    })

    it('min = 0 is the identity (brightness / volume / cover unchanged)', () => {
        expect(sliderValueToEntity(0, cfg())).toBe(0)
        expect(sliderValueToEntity(37.5, cfg())).toBe(37.5)
        expect(sliderValueToEntity(100, cfg())).toBe(100)
    })

    it('showMin true passes the value through without adding min', () => {
        expect(sliderValueToEntity(90, cfg({ showMin: true, min: 80 }))).toBe(90)
        expect(sliderValueToEntity(100, cfg({ showMin: true, min: 80 }))).toBe(100)
    })

    it('clamps to min', () => {
        expect(sliderValueToEntity(0, cfg({ showMin: true, min: 80 }))).toBe(80)
    })

    it('applies the sliderMin rescale before the clamp', () => {
        // val=20, sliderMin=10 -> percentage(10, 90) = 11.111...
        expect(sliderValueToEntity(20, cfg({ sliderMin: 10 }))).toBeCloseTo(11.1111, 3)
    })

    it('inverse with min = 0 reduces to max - val', () => {
        expect(sliderValueToEntity(30, cfg({ inverse: true }))).toBe(70)
        expect(sliderValueToEntity(0, cfg({ inverse: true }))).toBe(100)
    })

    it('inverse with min > 0 mirrors within the real range (#63)', () => {
        // showMin false: real range is [min, max + min] -> 2*min + max - val
        expect(sliderValueToEntity(5, cfg({ inverse: true, min: 10, max: 20 }))).toBe(25)
        // showMin true: real range is [min, max] -> min + max - val
        expect(sliderValueToEntity(85, cfg({ showMin: true, inverse: true, min: 80, max: 100 }))).toBe(95)
    })

    it('is order-sensitive: +min happens BEFORE the sliderMin rescale', () => {
        // +min then rescale: percentage(60 - 10, 90) = 55.56
        // rescale then +min (WRONG order) would give percentage(0, 90) + 50 = 50
        expect(sliderValueToEntity(10, cfg({ min: 50, sliderMin: 10 }))).toBeCloseTo(55.5556, 3)
    })
})
