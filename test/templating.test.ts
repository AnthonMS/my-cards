import { describe, it, expect } from 'vitest'
import { evalTemplate, getTemplateOrValue, objectEvalTemplate } from '../src/scripts/templating'

// ============================================================================
// The [[[ ... ]]] JS templating feature (like custom:button-card).
// evalTemplate deliberately uses new Function — that is the documented feature,
// not something to "fix". These tests pin its contract.
// ============================================================================

const fakeState = { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } } as any
const fakeThat = {
    hass: {
        states: { 'light.a': fakeState },
        user: { name: 'tester' },
    },
}

describe('evalTemplate', () => {
    it('evaluates a JS body with states/entity/user/hass in scope', () => {
        expect(evalTemplate(fakeThat, fakeState, 'return 21 * 2')).toBe(42)
        expect(evalTemplate(fakeThat, fakeState, "return entity.state")).toBe('on')
        expect(evalTemplate(fakeThat, fakeState, "return states['light.a'].attributes.brightness")).toBe(128)
        expect(evalTemplate(fakeThat, fakeState, "return user.name")).toBe('tester')
    })

    it('wraps eval errors as MyCardJSTemplateError', () => {
        let caught: any
        try {
            evalTemplate(fakeThat, fakeState, 'return someUndefinedVariable')
        } catch (e) {
            caught = e
        }
        expect(caught).toBeInstanceOf(Error)
        expect(caught.name).toBe('MyCardJSTemplateError')
        expect(caught.message).toContain("in 'return someUndefinedVariable'")
    })
})

describe('getTemplateOrValue', () => {
    it('passes through numbers and booleans untouched', () => {
        expect(getTemplateOrValue(fakeThat, fakeState, 5)).toBe(5)
        expect(getTemplateOrValue(fakeThat, fakeState, 0)).toBe(0)
        expect(getTemplateOrValue(fakeThat, fakeState, false)).toBe(false)
    })

    it('passes through falsy values and plain strings', () => {
        expect(getTemplateOrValue(fakeThat, fakeState, undefined)).toBe(undefined)
        expect(getTemplateOrValue(fakeThat, fakeState, null)).toBe(null)
        expect(getTemplateOrValue(fakeThat, fakeState, '')).toBe('')
        expect(getTemplateOrValue(fakeThat, fakeState, 'plain')).toBe('plain')
    })

    it('evaluates [[[ ... ]]] strings (with surrounding whitespace)', () => {
        expect(getTemplateOrValue(fakeThat, fakeState, '[[[ return 1 + 1 ]]]')).toBe(2)
        expect(getTemplateOrValue(fakeThat, fakeState, '  [[[ return "x" ]]]  ')).toBe('x')
    })

    it('recurses into objects, mutating and returning them', () => {
        const input = { a: '[[[ return 10 ]]]', nested: { b: '[[[ return "y" ]]]', keep: 'z' } }
        const out = getTemplateOrValue(fakeThat, fakeState, input)
        expect(out).toEqual({ a: 10, nested: { b: 'y', keep: 'z' } })
        expect(out).toBe(input) // current behavior: same object, mutated in place
    })
})

describe('objectEvalTemplate', () => {
    it('clones (via JSON) then evaluates templates — original untouched', () => {
        const config = { entity: 'light.a', min: '[[[ return 5 + 5 ]]]', styles: { card: [{ height: '[[[ return "50px" ]]]' }] } }
        const out = objectEvalTemplate(fakeThat, fakeState, config)
        expect(out).toEqual({ entity: 'light.a', min: 10, styles: { card: [{ height: '50px' }] } })
        expect(config.min).toBe('[[[ return 5 + 5 ]]]')
    })
})
