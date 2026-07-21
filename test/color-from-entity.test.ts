import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'
import { kelvinToRgb } from '../src/scripts/helpers'

// ============================================================================
// Issue #28: colorFromEntity — set the progress fill from a light's current
// colour without needing a template. Convenience over the already-documented
// templating recipe (styles.progress background '[[[ rgb(...) ]]]').
//
//   rgb_color present (light on)      -> rgb(r,g,b)
//   else color_temp_kelvin (light on) -> Tanner Helland approximation
//   off / no colour / non-light       -> leave the style alone
//   user styles.progress background    -> ALWAYS wins
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const mount = async (config: Record<string, any>, entity: FakeEntity) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    return el
}

const progressBg = (el: any) =>
    (el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement).style.background

// the stock progress fill when nothing overrides it
const DEFAULT_BG = 'var(--paper-item-icon-active-color)'

const light = (state: string, attrs: Record<string, any> = {}): FakeEntity =>
    ({ entity_id: 'light.a', state, attributes: attrs })

afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks() })

describe('#28 colorFromEntity', () => {
    it('absent key: progress background is untouched (byte-identical default)', async () => {
        const withColor = await mount({ entity: 'light.a' }, light('on', { rgb_color: [255, 0, 0] }))
        // default render: the stock progress fill, unchanged by the colour feature
        expect(progressBg(withColor)).toBe(DEFAULT_BG)
    })

    it('on light with rgb_color -> rgb() fill', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('on', { rgb_color: [255, 100, 50] }))
        expect(progressBg(el)).toBe('rgb(255, 100, 50)')
    })

    it('rounds float rgb channels', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('on', { rgb_color: [254.6, 99.4, 50.5] }))
        expect(progressBg(el)).toBe('rgb(255, 99, 51)')
    })

    it('off light -> untouched (does not use a stale rgb_color)', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('off', { rgb_color: [255, 0, 0] }))
        expect(progressBg(el)).toBe(DEFAULT_BG)
    })

    it('kelvin fallback when no rgb_color (light on)', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('on', { color_temp_kelvin: 2700 }))
        expect(progressBg(el)).toBe('rgb(255, 167, 87)')
    })

    it('rgb_color takes precedence over kelvin', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('on', { rgb_color: [1, 2, 3], color_temp_kelvin: 2700 }))
        expect(progressBg(el)).toBe('rgb(1, 2, 3)')
    })

    it('on light with no colour info -> untouched', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('on', { brightness: 128 }))
        expect(progressBg(el)).toBe(DEFAULT_BG)
    })

    it('user styles.progress background ALWAYS wins', async () => {
        const el = await mount(
            { entity: 'light.a', colorFromEntity: true, styles: { progress: [{ background: 'black' }] } },
            light('on', { rgb_color: [255, 0, 0] }),
        )
        expect(progressBg(el)).toBe('black')
    })

    it('non-light entity: warn once, no colour applied', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const el = await mount({ entity: 'input_number.t', colorFromEntity: true },
            { entity_id: 'input_number.t', state: '50', attributes: { min: 0, max: 100, step: 1 } })
        expect(progressBg(el)).toBe(DEFAULT_BG)
        expect(warn).toHaveBeenCalled()
        // does not re-warn on a re-render
        el.hass = { states: { 'input_number.t': { entity_id: 'input_number.t', state: '60', attributes: { min: 0, max: 100, step: 1 } } }, user: { name: 't' }, callService: vi.fn() }
        await el.updateComplete
        expect(warn.mock.calls.filter(c => String(c[0]).includes('colorFromEntity')).length).toBe(1)
    })

    it('colour updates when the entity colour changes', async () => {
        const el = await mount({ entity: 'light.a', colorFromEntity: true }, light('on', { rgb_color: [255, 0, 0] }))
        expect(progressBg(el)).toBe('rgb(255, 0, 0)')
        el.hass = { states: { 'light.a': light('on', { rgb_color: [0, 128, 255] }) }, user: { name: 't' }, callService: vi.fn() }
        await el.updateComplete
        expect(progressBg(el)).toBe('rgb(0, 128, 255)')
    })
})

describe('#28 kelvinToRgb approximation table (Tanner Helland)', () => {
    it('reference values are stable', () => {
        expect(kelvinToRgb(2000)).toEqual({ r: 255, g: 137, b: 14 })
        expect(kelvinToRgb(2700)).toEqual({ r: 255, g: 167, b: 87 })
        expect(kelvinToRgb(4000)).toEqual({ r: 255, g: 206, b: 166 })
        expect(kelvinToRgb(6500)).toEqual({ r: 255, g: 254, b: 250 })
    })

    it('channels are always clamped to 0..255', () => {
        for (const k of [1000, 2000, 3500, 5000, 6500, 10000]) {
            const { r, g, b } = kelvinToRgb(k)
            for (const c of [r, g, b]) {
                expect(c).toBeGreaterThanOrEqual(0)
                expect(c).toBeLessThanOrEqual(255)
            }
        }
    })
})
