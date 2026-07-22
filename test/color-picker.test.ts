import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'
import { colorForValue, colorTrackDirection, colorTrackGradient } from '../src/scripts/helpers'

// ============================================================================
// #20 / #28: colour-picker sliders.
//
// mode: rgb (NEW) is a hue picker (picker look on by default). hue/saturation/
// temperature become pickers only with colorTrack: true (opt-in, non-breaking).
// Picker look = gradient track + transparent progress + a thumb showing the
// colour at the selected value. Every piece is overridable via styles:.
// Existing colour sliders (no colorTrack) must be byte-identical.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const W = 200, H = 200

const mount = async (config: Record<string, any>, entity: FakeEntity, callService = vi.fn()) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService }
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    return el
}

const track = (el: any) => (el.shadowRoot.querySelector('.my-slider-custom-track') as HTMLElement).style.background
const progress = (el: any) => (el.shadowRoot.querySelector('.my-slider-custom-progress') as HTMLElement).style.background
const thumb = (el: any) => el.shadowRoot.querySelector('.my-slider-custom-thumb') as HTMLElement
const container = (el: any) => el.shadowRoot.querySelector('.my-slider-custom-container') as HTMLElement

const lightOn = (attrs: Record<string, any>): FakeEntity =>
    ({ entity_id: 'light.a', state: 'on', attributes: attrs })

afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks() })

// ---------------------------------------------------------------------------
describe('#20 rgb mode read/write', () => {
    it('reads the hue from hs_color -> data-value', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb' }, lightOn({ hs_color: [180, 50] }))
        expect(container(el).getAttribute('data-value')).toBe('180')
    })

    it('honours a narrowed min/max', async () => {
        // showMin so the value is not hidden-min-shifted; data-value stays the raw hue.
        const el = await mount({ entity: 'light.a', mode: 'rgb', min: 100, max: 200, showMin: true }, lightOn({ hs_color: [150, 50] }))
        expect(container(el).getAttribute('data-value')).toBe('150')
    })

    it('writes hs_color at FULL saturation', async () => {
        const cs = vi.fn()
        const el = await mount({ entity: 'light.a', mode: 'rgb' }, lightOn({ hs_color: [10, 50] }), cs)
        el.actionTaken = true
        el.setValue(180, 50)
        expect(cs).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', hs_color: [180, 100] })
    })

    it('lenient colour check: works even without color_mode hs', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb' }, lightOn({ hs_color: [240, 100], color_mode: 'xy' }))
        expect(container(el).getAttribute('data-value')).toBe('240')
    })
})

describe('#20 hue mode still preserves saturation (regression pin)', () => {
    it('hue write keeps the current saturation, unlike rgb', async () => {
        const cs = vi.fn()
        const el = await mount({ entity: 'light.a', mode: 'hue' }, lightOn({ hs_color: [10, 42], color_mode: 'hs' }), cs)
        el.actionTaken = true
        el.setValue(200, 50)
        expect(cs).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', hs_color: [200, 42] })
    })
})

describe('#20 picker visuals', () => {
    it('rgb: gradient track, transparent progress, see-through handle by default', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb' }, lightOn({ hs_color: [120, 100] }))
        expect(track(el)).toContain('linear-gradient')
        expect(track(el)).toContain('hsl(0, 100%, 50%)')
        expect(progress(el)).toBe('transparent')
        const t = thumb(el)
        // transparent centre + white/dark two-tone ring; no colour fill
        expect(t.style.background).toBe('transparent')
        expect(t.style.border).toBe('1px solid rgb(255, 255, 255)')
        expect(t.style.boxShadow).toContain('rgba(0,0,0,0.3)')
        expect(t.style.boxSizing).toBe('border-box')
    })

    it('handle is a slim bar: width on horizontal, height on vertical', async () => {
        const h = await mount({ entity: 'light.a', mode: 'rgb' }, lightOn({ hs_color: [0, 100] }))
        expect(thumb(h).style.width).toBe('6px')
        expect(thumb(h).style.right).toBe('-3px')
        const v = await mount({ entity: 'light.b', mode: 'rgb', vertical: true }, { entity_id: 'light.b', state: 'on', attributes: { hs_color: [0, 100] } })
        expect(thumb(v).style.height).toBe('6px')
        expect(thumb(v).style.top).toBe('-3px')
    })

    it('temperature + colorTrack: warm/cool gradient, transparent progress', async () => {
        const el = await mount({ entity: 'light.a', mode: 'temperature', colorTrack: true },
            lightOn({ color_temp: 300, min_mireds: 153, max_mireds: 500 }))
        expect(track(el)).toContain('linear-gradient')
        expect(track(el)).toContain('rgb(') // kelvinToRgb stops
        expect(progress(el)).toBe('transparent')
    })

    it('saturation gradient embeds the current hue', async () => {
        const el = await mount({ entity: 'light.a', mode: 'saturation', colorTrack: true },
            lightOn({ hs_color: [270, 60], color_mode: 'hs' }))
        expect(track(el)).toContain('hsl(270,')
        expect(track(el)).toContain('0%, 100%') // white end
    })

    it('hue + colorTrack renders the picker too', async () => {
        const el = await mount({ entity: 'light.a', mode: 'hue', colorTrack: true },
            lightOn({ hs_color: [90, 80], color_mode: 'hs' }))
        expect(track(el)).toContain('linear-gradient')
        expect(progress(el)).toBe('transparent')
    })
})

describe('#20 opt-in: existing colour sliders are UNCHANGED without colorTrack', () => {
    const cases: Array<[string, FakeEntity]> = [
        ['temperature', lightOn({ color_temp: 300, min_mireds: 153, max_mireds: 500 })],
        ['hue', lightOn({ hs_color: [90, 80], color_mode: 'hs' })],
        ['saturation', lightOn({ hs_color: [90, 80], color_mode: 'hs' })],
    ]
    for (const [mode, entity] of cases) {
        it(`${mode}: plain track + fill, no gradient`, async () => {
            const el = await mount({ entity: 'light.a', mode }, entity)
            expect(track(el)).toBe('var(--card-background-color)')
            expect(progress(el)).toBe('var(--paper-item-icon-active-color)')
        })
    }

    it('brightness is never a picker even with colorTrack set', async () => {
        const el = await mount({ entity: 'light.a', mode: 'brightness', colorTrack: true }, lightOn({ brightness: 128 }))
        expect(track(el)).toBe('var(--card-background-color)')
        expect(progress(el)).not.toBe('transparent')
    })
})

describe('#20 user styles always win', () => {
    it('styles.track background beats the gradient', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb', styles: { track: [{ background: 'black' }] } },
            lightOn({ hs_color: [120, 100] }))
        expect(track(el)).toBe('black')
    })

    it('styles.progress background beats the transparent fill', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb', styles: { progress: [{ background: 'red' }] } },
            lightOn({ hs_color: [120, 100] }))
        expect(progress(el)).toBe('red')
    })

    it('any styles.thumb disables the picker thumb colour', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb', styles: { thumb: [{ background: 'black' }] } },
            lightOn({ hs_color: [120, 100] }))
        expect(thumb(el).style.background).toBe('black')
    })
})

describe('#20 gradient direction', () => {
    it('vertical uses "to top", flipped-vertical "to bottom"', async () => {
        const v = await mount({ entity: 'light.a', mode: 'rgb', vertical: true }, lightOn({ hs_color: [0, 100] }))
        expect(track(v)).toContain('to top')
        const vf = await mount({ entity: 'light.b', mode: 'rgb', vertical: true, flipped: true }, { entity_id: 'light.b', state: 'on', attributes: { hs_color: [0, 100] } })
        expect(track(vf)).toContain('to bottom')
    })

    it('horizontal flipped uses "to left"', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb', flipped: true }, lightOn({ hs_color: [0, 100] }))
        expect(track(el)).toContain('to left')
    })
})

describe('#20 state handling', () => {
    it('off light with rgb: gradient still renders (picker look persists)', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb' }, { entity_id: 'light.a', state: 'off', attributes: {} })
        expect(track(el)).toContain('linear-gradient')
    })

    it('two-way: an external colour change repositions the thumb', async () => {
        const el = await mount({ entity: 'light.a', mode: 'rgb' }, lightOn({ hs_color: [60, 100] }))
        expect(container(el).getAttribute('data-value')).toBe('60')
        el.hass = { states: { 'light.a': lightOn({ hs_color: [240, 100] }) }, user: { name: 't' }, callService: vi.fn() }
        await el.updateComplete
        expect(container(el).getAttribute('data-value')).toBe('240')
    })
})

// ---------------------------------------------------------------------------
describe('#20 color helper units', () => {
    it('colorForValue', () => {
        expect(colorForValue('hue', 0)).toBe('hsl(0, 100%, 50%)')
        expect(colorForValue('rgb', 240)).toBe('hsl(240, 100%, 50%)')
        expect(colorForValue('saturation', 50, 200)).toBe('hsl(200, 50%, 75%)')
        expect(colorForValue('temperature', 370)).toBe('rgb(255, 167, 88)')
    })
    it('colorTrackDirection matrix', () => {
        expect(colorTrackDirection(false, false, false)).toBe('to right')
        expect(colorTrackDirection(false, true, false)).toBe('to left')
        expect(colorTrackDirection(true, false, false)).toBe('to top')
        expect(colorTrackDirection(true, true, false)).toBe('to bottom')
        expect(colorTrackDirection(false, false, true)).toBe('to left') // inverse reverses
    })
    it('colorTrackGradient hue has 7 stops red..red', () => {
        const g = colorTrackGradient('hue', 0, 360, 0, 'to right')
        expect(g.startsWith('linear-gradient(to right, hsl(0, 100%, 50%) 0%')).toBe(true)
        expect(g).toContain('hsl(360, 100%, 50%) 100%')
    })
})
