import { describe, it, expect } from 'vitest'
import { applySliderMin, shiftForHiddenMin } from '../src/scripts/slider-math'

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
