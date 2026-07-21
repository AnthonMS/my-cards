import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'
import { valueToPercent } from '../src/scripts/slider-math'

// ============================================================================
// Issue #56: opt-in `markers:` draw static reference lines on the track (the
// issue's use case is a visible 0 dB midpoint on EQ-style sliders).
//
// Marker values are on the ENTITY scale (same as min/max) and are positioned
// with valueToPercent(), which mirrors the pipeline that places the thumb — so
// a marker at value V sits exactly where the thumb sits when the entity is at V.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const mount = async (config: Record<string, any>, entities: FakeEntity[]) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    const states: Record<string, FakeEntity> = {}
    for (const e of entities) states[e.entity_id] = e
    el.hass = { states, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    return el
}

const markersOf = (el: any) =>
    Array.from(el.shadowRoot!.querySelectorAll('.my-slider-custom-marker')) as HTMLElement[]

const num = (min: number, max: number, state: string): FakeEntity =>
    ({ entity_id: 'input_number.t', state, attributes: { min, max, step: 1 } })
const lightOn = (attrs: Record<string, any>): FakeEntity =>
    ({ entity_id: 'light.a', state: 'on', attributes: attrs })

afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks() })

describe('#56 DOM contract', () => {
    it('no markers key: no marker elements (existing configs unchanged)', async () => {
        const el = await mount({ entity: 'input_number.t' }, [num(0, 100, '50')])
        expect(markersOf(el).length).toBe(0)
    })

    it('markers render inside the track, not the container or progress', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 50 }] }, [num(0, 100, '50')])
        const m = markersOf(el)
        expect(m.length).toBe(1)
        expect(m[0].parentElement!.classList.contains('my-slider-custom-track')).toBe(true)
    })

    it('one element per entry, in order', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 25 }, { value: 50 }, { value: 75 }] }, [num(0, 100, '50')])
        const m = markersOf(el)
        expect(m.length).toBe(3)
        expect(m.map(x => x.style.left)).toEqual(['25%', '50%', '75%'])
    })

    it('the core DOM contract is untouched by markers', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 50 }] }, [num(0, 100, '50')])
        const root = el.shadowRoot!
        expect(root.querySelector('ha-card.my-slider-custom-card')).toBeTruthy()
        expect(root.querySelector('.my-slider-custom-container')!.getAttribute('data-value')).toBe('50')
        expect(root.querySelector('.my-slider-custom-thumb')).toBeTruthy()
    })
})

describe('#56 positioning matches where the thumb would sit', () => {
    it('plain 0..100: value 50 -> 50%', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 50 }] }, [num(0, 100, '50')])
        expect(markersOf(el)[0].style.left).toBe('50%')
    })

    it('hidden min: a marker at the entity value matches data-progress-percent', async () => {
        // brightness min 10, entity at 50% -> the pinned 40 / 44.44% characterization case.
        const el = await mount({ entity: 'light.a', min: 10, markers: [{ value: 50 }] }, [lightOn({ brightness: 128 })])
        const pct = el.shadowRoot!.querySelector('.my-slider-custom-container')!.getAttribute('data-progress-percent')
        expect(pct).toBe('44.44')
        expect(markersOf(el)[0].style.left).toBe('44.44%')
    })

    it('input_number 80..100: marker at 90 sits at 50%', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 90 }] }, [num(80, 100, '90')])
        expect(markersOf(el)[0].style.left).toBe('50%')
    })

    it('sliderMin rescales markers the same way it rescales the value', async () => {
        const el = await mount({ entity: 'input_number.t', sliderMin: 20, markers: [{ value: 50 }] }, [num(0, 100, '50')])
        // applySliderMin(50, 20) = 50*0.8 + 20 = 60
        expect(markersOf(el)[0].style.left).toBe('60%')
    })

    it('showMin true: no shift applied', async () => {
        const el = await mount({ entity: 'input_number.t', showMin: true, markers: [{ value: 90 }] }, [num(80, 100, '90')])
        expect(markersOf(el)[0].style.left).toBe('90%')
    })
})

describe('#56 orientation', () => {
    it('flipped horizontal positions from the right', async () => {
        const el = await mount({ entity: 'input_number.t', flipped: true, markers: [{ value: 25 }] }, [num(0, 100, '50')])
        const m = markersOf(el)[0]
        expect(m.style.right).toBe('25%')
        expect(m.style.left).toBe('')
    })

    it('vertical draws a horizontal line positioned from the bottom', async () => {
        const el = await mount({ entity: 'input_number.t', vertical: true, markers: [{ value: 25 }] }, [num(0, 100, '50')])
        const m = markersOf(el)[0]
        expect(m.style.bottom).toBe('25%')
        expect(m.style.width).toBe('100%')
        expect(m.style.height).toBe('2px')
    })

    it('cover (vertical + flipped + inverse defaults) mirrors the marker', async () => {
        const el = await mount({ entity: 'cover.c', mode: 'position', markers: [{ value: 25 }] },
            [{ entity_id: 'cover.c', state: 'open', attributes: { current_position: 50 } }])
        const m = markersOf(el)[0]
        // inverse mirrors the percentage, flipped positions from the top
        expect(m.style.top).toBe('75%')
    })
})

describe('#56 styling', () => {
    it('styles.marker overrides the defaults', async () => {
        const el = await mount({
            entity: 'input_number.t',
            markers: [{ value: 50 }],
            styles: { marker: [{ background: 'red' }, { width: '4px' }] },
        }, [num(0, 100, '50')])
        const m = markersOf(el)[0]
        expect(m.style.background).toBe('red')
        expect(m.style.width).toBe('4px')
        expect(m.style.left, 'position still managed by the card').toBe('50%')
    })

    it('a user-supplied left disables position tracking (escape hatch)', async () => {
        const el = await mount({
            entity: 'input_number.t',
            markers: [{ value: 50 }],
            styles: { marker: [{ left: '10px' }] },
        }, [num(0, 100, '50')])
        expect(markersOf(el)[0].style.left).toBe('10px')
    })

    it('markers do not intercept pointer input', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 50 }] }, [num(0, 100, '50')])
        expect(markersOf(el)[0].style.pointerEvents).toBe('none')
    })
})

describe('#56 bad input is survivable', () => {
    it('out-of-range value clamps and warns instead of throwing', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 150 }] }, [num(0, 100, '50')])
        expect(markersOf(el)[0].style.left).toBe('100%')
        expect(warn).toHaveBeenCalled()
    })

    it('below-range value clamps to 0%', async () => {
        vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const el = await mount({ entity: 'input_number.t', markers: [{ value: -20 }] }, [num(0, 100, '50')])
        expect(markersOf(el)[0].style.left).toBe('0%')
    })

    it('non-numeric value is skipped with a warning, card still renders', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const el = await mount({ entity: 'input_number.t', markers: [{ value: 'abc' }, { value: 50 }] }, [num(0, 100, '50')])
        expect(markersOf(el).length).toBe(1)
        expect(markersOf(el)[0].style.left).toBe('50%')
        expect(warn).toHaveBeenCalled()
    })

    it('a templated marker value arriving as a string still positions', async () => {
        // objectEvalTemplate evaluates the whole config; numeric templates can come back
        // as strings, so parseFloat handles them.
        const el = await mount({ entity: 'input_number.t', markers: [{ value: '50' }] }, [num(0, 100, '50')])
        expect(markersOf(el)[0].style.left).toBe('50%')
    })

    it('empty markers array renders nothing and does not throw', async () => {
        const el = await mount({ entity: 'input_number.t', markers: [] }, [num(0, 100, '50')])
        expect(markersOf(el).length).toBe(0)
    })
})

describe('#56 valueToPercent unit cases', () => {
    const cfg = (o: any = {}) => ({ showMin: false, min: 0, max: 100, sliderMin: 0, inverse: false, ...o })

    it('identity on a plain 0..100 range', () => {
        expect(valueToPercent(0, cfg())).toBe(0)
        expect(valueToPercent(50, cfg())).toBe(50)
        expect(valueToPercent(100, cfg())).toBe(100)
    })

    it('hidden min: the pinned brightness 44.44% case', () => {
        // min 10 -> stored max is the shrunk 90; entity value 50 -> slider 40 -> 44.44%
        expect(valueToPercent(50, cfg({ min: 10, max: 90 }))).toBe(44.44)
    })

    it('showMin true does not shift', () => {
        expect(valueToPercent(90, cfg({ showMin: true, min: 80, max: 100 }))).toBe(90)
    })

    it('inverse mirrors', () => {
        expect(valueToPercent(25, cfg({ inverse: true }))).toBe(75)
    })

    it('clamps outside the range', () => {
        expect(valueToPercent(150, cfg())).toBe(100)
        expect(valueToPercent(-50, cfg())).toBe(0)
    })
})
