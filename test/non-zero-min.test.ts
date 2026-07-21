import { describe, it, expect, afterEach, vi } from 'vitest'

// Importing the card registers the <my-slider-v2> custom element (side effect).
import '../src/cards/my-slider'

// ============================================================================
// #75 — my-slider-v2 and entities whose min is not 0.
//
// Two independent root causes, both pinned here:
//
//   (a) OUT-OF-RANGE WRITES. initializeConfig() shrinks max by min via
//       shiftForHiddenMin() when showMin is false, so setValue() can add min
//       back. `deepMerge(defaultConfig, this._config)` let the RAW user config
//       win, so an explicit `max:` in YAML undid the shrink while setValue
//       still added min -> writes up to max + min, which HA rejects.
//
//   (b) The apparent "dead zone" in the #75 title is a CONSEQUENCE of (a), not a
//       separate fault: once writes exceed max HA rejects them, so the upper part
//       of the track stops doing anything. Fixing (a) fixes it.
//
// Reported by StijnVdd (#75); PR #76 identified (a) but fixed it by rescaling
// calcProgress unconditionally, which broke every entity-derived range.
//
// NOTE ON showMin: the clamp under showMin:true is DELIBERATE, not a bug. See the
// showMin describe block below for the semantics it pins.
//
// The min = 0 blocks are REGRESSION PINS: brightness, volume and cover position
// must be byte-identical to their pre-fix behavior (base is 0 for them, so the
// arithmetic is untouched).
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const makeHass = (entities: FakeEntity[]) => {
    const states: Record<string, FakeEntity> = {}
    for (const e of entities) states[e.entity_id] = e
    return { states, user: { name: 'tester' }, callService: vi.fn() }
}

const W = 200, H = 200

const mountSlider = async (config: Record<string, any>, entities: FakeEntity[]) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    const hass = makeHass(entities)
    el.hass = hass
    document.body.appendChild(el)
    await el.updateComplete
    // sliderEl is grabbed in a requestAnimationFrame after the first render.
    await new Promise(r => requestAnimationFrame(() => r(null)))
    await new Promise(r => setTimeout(r, 0))
    const container = el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement
    // jsdom has no layout: fake the slider box so click math has something to work with.
    Object.defineProperty(container, 'offsetWidth', { value: W, configurable: true })
    Object.defineProperty(container, 'offsetHeight', { value: H, configurable: true })
    container.getBoundingClientRect = () => ({
        left: 0, top: 0, right: W, bottom: H, width: W, height: H, x: 0, y: 0, toJSON: () => ({}),
    }) as DOMRect
    return { el, container, hass }
}

/**
 * Tap at `frac` (0..1) along the slider and return the payload written to HA
 * plus the rendered progress size. `null` written means no service call fired,
 * which happens when the tapped value equals the entity's current value.
 * Coordinates are floored at 1px: the card reads `event.clientX || touches[0]`,
 * so a literal 0 throws (see F-12 in FABLE_FINDINGS).
 */
const tapAt = async (config: Record<string, any>, entities: FakeEntity[], frac: number, vertical = false) => {
    const { el, container, hass } = await mountSlider(config, entities)
    const clientX = vertical ? 5 : Math.max(1, Math.round(frac * W))
    const clientY = vertical ? Math.max(1, Math.round(H * (1 - frac))) : 5
    container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX, clientY }))
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX, clientY }))
    await el.updateComplete
    const calls = (hass.callService as any).mock.calls
    const last = calls.length ? calls[calls.length - 1] : null
    const p = el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement
    return { written: last ? last[2] : null, size: p ? (vertical ? p.style.height : p.style.width) : null }
}

const valueAt = async (config: Record<string, any>, entities: FakeEntity[], frac: number, key: string, vertical = false) => {
    const r = await tapAt(config, entities, frac, vertical)
    return r.written === null ? null : r.written[key]
}

afterEach(() => { document.body.innerHTML = ''; vi.useRealTimers() })

const inputNumber = (min: number, max: number, state: string): FakeEntity =>
    ({ entity_id: 'input_number.test', state, attributes: { min, max, step: 1 } })

// ---------------------------------------------------------------------------
// showMin semantics — this is the FEATURE, pin it so nobody "fixes" it again
//
// showMin:true scales the bar to the ABSOLUTE [0, max] space, so an entity whose
// min is 80 renders a bar that is always at least 80% full and only the top 20%
// of the track is draggable. showMin:false (the default) hides the minimum: the
// range is shifted to [0, max-min] so the whole track is usable.
//
// A previous attempt at #75 made showMin:true map the track onto [min, max],
// which made the whole track draggable and then jumped back to 80% on the next
// render (drag-time and at-rest mappings disagreed). Both are pinned below.
// ---------------------------------------------------------------------------
describe('showMin:true keeps the minimum visible and only the top of the track live', () => {
    const entity = [inputNumber(80, 100, '90')]
    const cfg = { entity: 'input_number.test', showMin: true }

    it('taps below the minimum clamp to min instead of scaling', async () => {
        expect(await valueAt(cfg, entity, 0, 'value')).toBe(80)
        expect(await valueAt(cfg, entity, 0.25, 'value')).toBe(80)
        expect(await valueAt(cfg, entity, 0.5, 'value')).toBe(80)
        expect(await valueAt(cfg, entity, 0.75, 'value')).toBe(80)
    })

    it('the live part of the track maps 1:1 to absolute percentage', async () => {
        expect(await valueAt(cfg, entity, 0.85, 'value')).toBe(85)
        expect(await valueAt(cfg, entity, 0.95, 'value')).toBe(95)
        expect(await valueAt(cfg, entity, 1, 'value')).toBe(100)
    })

    it('the bar never renders below min% while dragging', async () => {
        expect((await tapAt(cfg, entity, 0)).size).toBe('80%')
        expect((await tapAt(cfg, entity, 0.5)).size).toBe('80%')
        expect((await tapAt(cfg, entity, 0.85)).size).toBe('85%')
        expect((await tapAt(cfg, entity, 1)).size).toBe('100%')
    })

    it('the at-rest render agrees with the drag mapping (no jump on refresh)', async () => {
        // The regression that showed up in HA: dragging used one mapping and the
        // next render used another, so the bar jumped to 80% after the dashboard
        // refreshed. Tap to 85, then assert a fresh mount at 85 draws the same bar.
        expect((await tapAt(cfg, entity, 0.85)).size).toBe('85%')
        const { el } = await mountSlider(cfg, [inputNumber(80, 100, '85')])
        const p = el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement
        expect(p.style.width).toBe('85%')
    })

    it('works the same when the entity range is wider than the configured range', async () => {
        // input_number 0..100 driven by a card configured min:80 max:100 showMin:true —
        // the full 0..100 track is shown, the bar cannot go below 80%.
        const wide = [inputNumber(0, 100, '90')]
        const c = { entity: 'input_number.test', min: 80, max: 100, showMin: true }
        expect(await valueAt(c, wide, 0.25, 'value')).toBe(80)
        expect((await tapAt(c, wide, 0.25)).size).toBe('80%')
        expect(await valueAt(c, wide, 0.95, 'value')).toBe(95)
        expect((await tapAt(c, wide, 0.95)).size).toBe('95%')
    })

    it('showMin:false by contrast makes the whole track usable', async () => {
        const c = { entity: 'input_number.test' }
        expect(await valueAt(c, entity, 0.25, 'value')).toBe(85)
        expect((await tapAt(c, entity, 0.25)).size).toBe('25%')
    })
})

// ---------------------------------------------------------------------------
// (a) out-of-range writes: min/max set explicitly in YAML
// ---------------------------------------------------------------------------
describe('#75 (a) explicit min/max in YAML no longer emits out-of-range values', () => {
    const entity = [inputNumber(0, 100, '90')]
    const cfg = { entity: 'input_number.test', min: 80, max: 100 }

    it('stays inside [min, max] across the whole track', async () => {
        // Pre-fix: 81 at the far left rising to 180 at the far right.
        for (const f of [0, 0.25, 0.5, 0.75, 1]) {
            const v = await valueAt(cfg, entity, f, 'value')
            if (v === null) continue
            expect(v, `tap at ${f}`).toBeGreaterThanOrEqual(80)
            expect(v, `tap at ${f}`).toBeLessThanOrEqual(100)
        }
    })

    it('maps the track linearly onto the configured range', async () => {
        expect(await valueAt(cfg, entity, 0, 'value')).toBe(80)
        expect(await valueAt(cfg, entity, 0.25, 'value')).toBe(85)
        expect(await valueAt(cfg, entity, 1, 'value')).toBe(100)
    })

    it('the computed min/max survive the user-config merge', async () => {
        const { el } = await mountSlider(cfg, entity)
        // max is stored pre-shrunk (raw max - min) when showMin is false; the raw
        // `max: 100` from YAML must not clobber it back.
        expect(el._config.min).toBe(80)
        expect(el._config.max).toBe(20)
    })

    it('agrees with the same range taken from entity attributes', async () => {
        for (const f of [0, 0.25, 0.75, 1]) {
            const fromYaml = await valueAt(cfg, entity, f, 'value')
            const fromEntity = await valueAt({ entity: 'input_number.test' }, [inputNumber(80, 100, '90')], f, 'value')
            expect(fromYaml, `tap at ${f}`).toBe(fromEntity)
        }
    })
})

// ---------------------------------------------------------------------------
// entity-derived ranges (the default) must be UNCHANGED — this is what PR #76 broke
// ---------------------------------------------------------------------------
describe('#75 entity-derived min>0 ranges are unchanged', () => {
    it('input_number 80..100 spans the full range', async () => {
        const e = [inputNumber(80, 100, '90')]
        const c = { entity: 'input_number.test' }
        expect(await valueAt(c, e, 0, 'value')).toBe(80)
        expect(await valueAt(c, e, 0.25, 'value')).toBe(85)
        expect(await valueAt(c, e, 1, 'value')).toBe(100)
    })

    it('input_number 5..35 reaches its maximum', async () => {
        const e = [inputNumber(5, 35, '20')]
        const c = { entity: 'input_number.test' }
        expect(await valueAt(c, e, 0, 'value')).toBe(5)
        expect(await valueAt(c, e, 1, 'value')).toBe(35)
    })

    it('input_number with a negative min spans the full range', async () => {
        const e = [inputNumber(-10, 10, '0')]
        const c = { entity: 'input_number.test' }
        expect(await valueAt(c, e, 0, 'value')).toBe(-10)
        expect(await valueAt(c, e, 0.25, 'value')).toBe(-5)
        expect(await valueAt(c, e, 1, 'value')).toBe(10)
    })

    it('light temperature (mireds 153..500) reaches the warm end', async () => {
        // PR #76 capped this at 347 — the regression that made it unmergeable.
        const e: FakeEntity[] = [{ entity_id: 'light.l', state: 'on', attributes: { color_temp: 300, min_mireds: 153, max_mireds: 500 } }]
        const c = { entity: 'light.l', mode: 'temperature' }
        expect(await valueAt(c, e, 1, 'color_temp')).toBe(500)
        expect(await valueAt(c, e, 0.5, 'color_temp')).toBe(327)
    })

    it('inverse with min>0 still mirrors within the real range', async () => {
        const e = [inputNumber(80, 100, '90')]
        const c = { entity: 'input_number.test', inverse: true }
        expect(await valueAt(c, e, 0, 'value')).toBe(100)
        expect(await valueAt(c, e, 1, 'value')).toBe(80)
    })

    it('flipped with min>0 still reverses the track', async () => {
        const e = [inputNumber(80, 100, '90')]
        const c = { entity: 'input_number.test', flipped: true }
        expect(await valueAt(c, e, 0, 'value')).toBe(100)
        expect(await valueAt(c, e, 1, 'value')).toBe(80)
    })
})

// ---------------------------------------------------------------------------
// min = 0 regression pins — must be identical to pre-fix behavior
// ---------------------------------------------------------------------------
describe('#75 min=0 sliders are untouched', () => {
    it('light brightness', async () => {
        const e: FakeEntity[] = [{ entity_id: 'light.l', state: 'on', attributes: { brightness: 128 } }]
        const c = { entity: 'light.l' }
        expect(await valueAt(c, e, 0.25, 'brightness')).toBe(64)
        expect(await valueAt(c, e, 0.75, 'brightness')).toBe(192)
        expect(await valueAt(c, e, 1, 'brightness')).toBe(256)
    })

    it('media_player volume', async () => {
        const e: FakeEntity[] = [{ entity_id: 'media_player.m', state: 'playing', attributes: { volume_level: 0.5 } }]
        const c = { entity: 'media_player.m', mode: 'volume' }
        expect(await valueAt(c, e, 0.25, 'volume_level')).toBe(0.25)
        expect(await valueAt(c, e, 1, 'volume_level')).toBe(1)
    })

    it('cover position (vertical + flipped + inverse defaults)', async () => {
        const e: FakeEntity[] = [{ entity_id: 'cover.c', state: 'open', attributes: { current_position: 50 } }]
        const c = { entity: 'cover.c', mode: 'position' }
        expect(await valueAt(c, e, 0.25, 'position', true)).toBe(25)
        expect(await valueAt(c, e, 0.75, 'position', true)).toBe(75)
    })

    it('input_number 0..100', async () => {
        const e = [inputNumber(0, 100, '50')]
        const c = { entity: 'input_number.test' }
        expect(await valueAt(c, e, 0.25, 'value')).toBe(25)
        expect(await valueAt(c, e, 0.75, 'value')).toBe(75)
        expect(await valueAt(c, e, 1, 'value')).toBe(100)
    })
})
