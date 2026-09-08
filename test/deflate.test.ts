import { describe, it, expect } from 'vitest'
// The implementation my-slider-v2 and my-button actually import:
import { deflate as deflateJs } from '../src/scripts/deflate'
// The typed twin in helpers.ts (no card call sites today):
import { deflate as deflateTs } from '../src/scripts/helpers'

// ============================================================================
// deflate() flattens nested `styles:` config blocks into a single-level object
// keyed by the LAST key segment only. Two implementations exist (see
// docs/FABLE_FINDINGS.md F-4). These tests pin the behavior of the one in use
// AND prove the two are interchangeable — the prerequisite for unifying them
// in the cleanup phase.
// ============================================================================

const representativeInputs: Array<[string, any]> = [
    ['typical styles block (array of single-pair objects, as YAML produces)', [
        { height: '50px' },
        { background: 'red' },
    ]],
    ['nested objects keep only the leaf key', {
        foo: { bar: { baz: 'SUCCESS!', biz: 'x' } },
    }],
    ['array values are flattened per index (leaf key = index!)', {
        foo: { bar: { biz: ['first', 'second', 'third'] } },
    }],
    ['duplicate leaf keys: last one wins', [
        { background: 'red' },
        { background: 'blue' },
    ]],
    ['mixed flat object', { height: '30px', width: '100%' }],
    ['empty object', {}],
    ['null values are kept as leaves', { a: null, b: { c: null } }],
]

describe('deflate (src/scripts/deflate.js — the one the cards import)', () => {
    it('flattens a typical styles: list into one object', () => {
        expect(deflateJs([{ height: '50px' }, { background: 'red' }]))
            .toEqual({ height: '50px', background: 'red' })
    })

    it('keeps only the LAST key of a nested path', () => {
        expect(deflateJs({ foo: { bar: { baz: 'SUCCESS!' } } })).toEqual({ baz: 'SUCCESS!' })
    })

    it('array leaf values become index-keyed entries (documented quirk)', () => {
        expect(deflateJs({ biz: ['first', 'second'] })).toEqual({ 0: 'first', 1: 'second' })
    })

    it('later duplicate leaf keys overwrite earlier ones', () => {
        expect(deflateJs([{ background: 'red' }, { background: 'blue' }]))
            .toEqual({ background: 'blue' })
    })

    it('undefined/empty input returns empty object', () => {
        expect(deflateJs(undefined)).toEqual({})
        expect(deflateJs({})).toEqual({})
    })

    it('does not throw on null leaves', () => {
        expect(deflateJs({ a: null })).toEqual({ a: null })
    })
})

describe('deflate parity: deflate.js vs helpers.ts', () => {
    for (const [name, input] of representativeInputs) {
        it(`identical output for: ${name}`, () => {
            // deep-clone per call: both implementations walk the object
            const a = deflateJs(JSON.parse(JSON.stringify(input)))
            const b = deflateTs(JSON.parse(JSON.stringify(input)))
            expect(a).toEqual(b)
        })
    }
})
