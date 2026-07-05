import { describe, it, expect } from 'vitest'
import {
    percentage,
    roundPercentage,
    getClickPosRelToTarget,
    camelToKebab,
    myStyleMap,
    deepMerge,
    mergeDeep,
    isObject,
    arrayToObject,
    objectToArray,
    computeDomain,
    computeEntity,
    stateActive,
} from '../src/scripts/helpers'

// ============================================================================
// CHARACTERIZATION TESTS
// These tests pin the CURRENT behavior of the shared helpers used by
// my-slider-v2 (and my-button). They are the safety net for later cleanup.
// If one of these fails after a refactor, behavior changed — that's a bug in
// the refactor, not in the test.
// ============================================================================

describe('percentage', () => {
    it('computes val as percent of max (default max=100)', () => {
        expect(percentage(50)).toBe(50)
        expect(percentage(128, 256)).toBe(50)
        expect(percentage(25, 50)).toBe(50)
        expect(percentage(0, 100)).toBe(0)
        expect(percentage(100, 100)).toBe(100)
    })

    it('supports a min bound (range width = max - min)', () => {
        expect(percentage(50, 150, 50)).toBe(50)
        expect(percentage(10, 20, 0)).toBe(50)
    })

    it('does NOT clamp: values outside the range give <0 or >100', () => {
        expect(percentage(150, 100)).toBe(150)
        expect(percentage(-10, 100)).toBe(-10)
    })

    it('propagates NaN for undefined input (current behavior, relied on nowhere but real)', () => {
        expect(percentage(undefined)).toBeNaN()
    })
})

describe('roundPercentage', () => {
    it('rounds to two decimals', () => {
        expect(roundPercentage(44.4444)).toBe(44.44)
        expect(roundPercentage(42.365)).toBe(42.37)
        expect(roundPercentage(50)).toBe(50)
        expect(roundPercentage(0)).toBe(0)
        expect(roundPercentage(99.999)).toBe(100)
    })
})

describe('getClickPosRelToTarget', () => {
    const fakeElement = {
        getBoundingClientRect: () => ({ left: 10, top: 20 }),
        offsetHeight: 100,
    }

    it('mouse events: x relative to left edge, y relative to BOTTOM edge', () => {
        const event = { type: 'mousedown', clientX: 60, clientY: 70 }
        const pos = getClickPosRelToTarget(event, fakeElement)
        expect(pos.x).toBe(50) // 60 - 10
        expect(pos.y).toBe(50) // 100 - (70 - 20)
    })

    it('touch events: uses touches[0]', () => {
        const event = { type: 'touchmove', touches: [{ clientX: 110, clientY: 120 }] }
        const pos = getClickPosRelToTarget(event, fakeElement)
        expect(pos.x).toBe(100) // 110 - 10
        expect(pos.y).toBe(0)   // 100 - (120 - 20)
    })

    it('touchend with no touches falls back to changedTouches[0]', () => {
        const event = { type: 'touchend', touches: [], changedTouches: [{ clientX: 10, clientY: 20 }] }
        const pos = getClickPosRelToTarget(event, fakeElement)
        expect(pos.x).toBe(0)
        expect(pos.y).toBe(100)
    })

    it('unknown event types yield coordinates relative to (0,0)', () => {
        const pos = getClickPosRelToTarget({ type: 'keydown' }, fakeElement)
        expect(pos.x).toBe(-10)  // 0 - left(10)
        expect(pos.y).toBe(120)  // 100 - (0 - 20)
    })
})

describe('camelToKebab', () => {
    it('converts camelCase to kebab-case', () => {
        expect(camelToKebab('backgroundColor')).toBe('background-color')
        expect(camelToKebab('borderTopLeftRadius')).toBe('border-top-left-radius')
        expect(camelToKebab('height')).toBe('height')
    })

    it('leaves already-kebab strings alone', () => {
        expect(camelToKebab('background-color')).toBe('background-color')
    })

    it('current behavior: digits/uppercase-equal chars get a dash (characterization)', () => {
        // '5' === '5'.toUpperCase() so digits are treated like capitals
        expect(camelToKebab('margin5')).toBe('margin-5')
    })
})

describe('myStyleMap', () => {
    it('renders style object to css string with kebab keys', () => {
        expect(myStyleMap({ backgroundColor: 'red', height: '10px' }))
            .toBe('background-color:red;height:10px;')
    })
    it('returns empty string for falsy input', () => {
        expect(myStyleMap(undefined)).toBe('')
        expect(myStyleMap(null)).toBe('')
    })
})

describe('isObject', () => {
    it('true for plain objects, false for arrays/null/primitives', () => {
        expect(isObject({})).toBeTruthy()
        expect(isObject([])).toBeFalsy()
        expect(isObject(null)).toBeFalsy()
        expect(isObject('a')).toBeFalsy()
        expect(isObject(5)).toBeFalsy()
    })
})

describe('arrayToObject / objectToArray', () => {
    it('arrayToObject combines single-pair objects', () => {
        expect(arrayToObject([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 })
    })
    it('objectToArray splits into single-pair objects', () => {
        expect(objectToArray({ a: 1, b: 2 })).toEqual([{ a: 1 }, { b: 2 }])
    })
})

describe('computeDomain / computeEntity', () => {
    it('splits entity ids', () => {
        expect(computeDomain('light.sofa_spots')).toBe('light')
        expect(computeEntity('light.sofa_spots')).toBe('sofa_spots')
    })
})

describe('stateActive', () => {
    const ent = (entity_id: string, state: string) => ({ entity_id, state, attributes: {} }) as any

    it('undefined entity is inactive', () => {
        expect(stateActive(undefined)).toBe(false)
    })
    it('light on/off', () => {
        expect(stateActive(ent('light.a', 'on'))).toBe(true)
        expect(stateActive(ent('light.a', 'off'))).toBe(false)
        expect(stateActive(ent('light.a', 'unavailable'))).toBe(false)
    })
    it('cover: closed is inactive, open is active', () => {
        expect(stateActive(ent('cover.a', 'open'))).toBe(true)
        expect(stateActive(ent('cover.a', 'closed'))).toBe(false)
    })
    it('lock: locked is inactive', () => {
        expect(stateActive(ent('lock.a', 'locked'))).toBe(false)
        expect(stateActive(ent('lock.a', 'unlocked'))).toBe(true)
    })
    it('media_player: standby is inactive, playing/paused active', () => {
        expect(stateActive(ent('media_player.a', 'standby'))).toBe(false)
        expect(stateActive(ent('media_player.a', 'playing'))).toBe(true)
        expect(stateActive(ent('media_player.a', 'paused'))).toBe(true)
    })
})

// ============================================================================
// deepMerge vs mergeDeep — two different implementations live in helpers.ts.
// my-slider-v2 and my-button use deepMerge. mergeDeep has no call sites in src/
// (see docs/FABLE_FINDINGS.md F-3) but is a public export. These tests document
// the difference so a future unification doesn't silently change behavior.
// ============================================================================

describe('deepMerge (used by my-slider-v2: deepMerge(defaultConfig, userConfig))', () => {
    it('source (2nd arg) wins over target on scalar conflicts', () => {
        expect(deepMerge({ a: 1, b: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
    })

    it('merges nested objects recursively', () => {
        expect(deepMerge({ s: { x: 1, y: 1 } }, { s: { y: 2 } })).toEqual({ s: { x: 1, y: 2 } })
    })

    it('merges arrays BY INDEX (object items merged, scalars replaced)', () => {
        expect(deepMerge({ arr: [{ a: 1 }, { b: 1 }] }, { arr: [{ c: 2 }] }))
            .toEqual({ arr: [{ a: 1, c: 2 }] }) // note: result length = source length
        expect(deepMerge({ arr: [1, 2, 3] }, { arr: [9] })).toEqual({ arr: [9] })
    })

    it('does not mutate target', () => {
        const target = { a: 1, s: { x: 1 } }
        deepMerge(target, { a: 2, s: { x: 2 } })
        expect(target).toEqual({ a: 1, s: { x: 1 } })
    })

    it('non-object target returns source (or {} if both non-objects)', () => {
        expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 })
        expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 })
        expect(deepMerge(null, null)).toEqual({})
        expect(deepMerge('x', 5)).toEqual({})
    })

    it('exact slider scenario: defaults filled, user config wins', () => {
        const defaults = { min: 0, max: 100, step: 1, vertical: false }
        const user = { entity: 'light.a', max: 90, styles: { card: { height: '50px' } } }
        expect(deepMerge(defaults, user)).toEqual({
            min: 0, max: 90, step: 1, vertical: false,
            entity: 'light.a', styles: { card: { height: '50px' } },
        })
    })
})

describe('mergeDeep (exported but currently unused in src/)', () => {
    it('later objects win on scalar conflicts', () => {
        expect(mergeDeep({ a: 1, b: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
    })

    it('CONCATENATES arrays (different from deepMerge!)', () => {
        expect(mergeDeep({ arr: [1, 2] }, { arr: [3] })).toEqual({ arr: [1, 2, 3] })
    })

    it('supports more than two objects', () => {
        expect(mergeDeep({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
    })
})
