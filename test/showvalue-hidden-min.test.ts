import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// F-11: the showValue drag label used to print the INTERNAL slider-space value.
// With showMin false (the default) initializeConfig shifts the working value
// down by min, so the bubble read low by exactly min — an input_number at 65
// with min 50 displayed 15 — while the value actually written was correct.
//
// The label now runs the same sliderValueToEntity() conversion setValue uses,
// so the number shown and the number written can never disagree.
//
// Reproduction table from the maintainer's dashboard (FABLE_F11_PLAN):
//   min 50, value 65 -> bubble showed 15
//   min 10, value 60 -> bubble showed 50
//   min  5, value 60 -> bubble showed 55
//   min  0, value  5 -> bubble showed 5 (correct)
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const W = 200, H = 200

const mount = async (config: Record<string, any>, entity: FakeEntity) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    const hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService: vi.fn() }
    el.hass = hass
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    const c = el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement
    Object.defineProperty(c, 'offsetWidth', { value: W, configurable: true })
    Object.defineProperty(c, 'offsetHeight', { value: H, configurable: true })
    c.getBoundingClientRect = () => ({ left: 0, top: 0, right: W, bottom: H, width: W, height: H, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect
    return { el, container: c, hass }
}

/** Press at `frac` along the track and return what the bubble shows + what got written. */
const dragTo = async (config: Record<string, any>, entity: FakeEntity, frac: number) => {
    const { el, container, hass } = await mount(config, entity)
    const clientX = Math.max(1, Math.round(frac * W))
    container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX, clientY: 5 }))
    document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX, clientY: 5 }))
    const valueEl = el.shadowRoot!.querySelector('.my-slider-custom-value') as HTMLElement
    const label = valueEl ? valueEl.textContent : null
    const progress = el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement
    const width = progress.style.width
    // release so the value is committed
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX, clientY: 5 }))
    await el.updateComplete
    const calls = (hass.callService as any).mock.calls
    const written = calls.length ? calls[calls.length - 1][2] : null
    return { label, width, written }
}

const inputNumber = (min: number, max: number, state: string): FakeEntity =>
    ({ entity_id: 'input_number.t', state, attributes: { min, max, step: 1 } })

afterEach(() => { document.body.innerHTML = ''; vi.useRealTimers() })

describe('F-11 showValue label with a hidden minimum', () => {
    it('shows the real entity value, not value - min', async () => {
        // min 50 slider: dragging to 30% of the track is entity value 65.
        const r = await dragTo({ entity: 'input_number.t', showValue: true }, inputNumber(50, 100, '65'), 0.3)
        expect(r.label).toBe('65')
    })

    it('the label matches the value written, across the track', async () => {
        const cfg = { entity: 'input_number.t', showValue: true }
        for (const frac of [0.1, 0.35, 0.6, 0.9]) {
            const r = await dragTo(cfg, inputNumber(50, 100, '65'), frac)
            expect(r.written, `tap at ${frac}`).not.toBeNull()
            // The label is deliberately rounded to 2dp (parseFloat(toFixed(2))); the
            // written value carries the raw float. Agreement to 2dp is the contract.
            expect(Number(r.label), `tap at ${frac}`).toBeCloseTo(r.written.value, 2)
            document.body.innerHTML = ''
        }
    })

    it('reproduces the reported rows: min 10 and min 5 sliders', async () => {
        const cfg = { entity: 'input_number.t', showValue: true }
        // 60 on a min:10 max:100 slider sits at (60-10)/90 of the track
        const a = await dragTo(cfg, inputNumber(10, 100, '60'), 50 / 90)
        expect(Number(a.label)).toBeCloseTo(60, 0)
        document.body.innerHTML = ''
        const b = await dragTo(cfg, inputNumber(5, 100, '60'), 55 / 95)
        expect(Number(b.label)).toBeCloseTo(60, 0)
    })

    it('min = 0 sliders are unchanged (regression pin)', async () => {
        const r = await dragTo({ entity: 'input_number.t', showValue: true }, inputNumber(0, 100, '5'), 0.42)
        expect(r.label).toBe('42')
        expect(Number(r.label)).toBeCloseTo(r.written.value, 2)
    })

    it('thumb position is unchanged by the label fix', async () => {
        // Position was always correct; only the printed number was wrong.
        const r = await dragTo({ entity: 'input_number.t', showValue: true }, inputNumber(50, 100, '65'), 0.3)
        expect(r.width).toBe('30%')
    })

    it('formatting parity: still parseFloat(toFixed(2)), no trailing zeros', async () => {
        const r = await dragTo({ entity: 'input_number.t', showValue: true }, inputNumber(0, 100, '5'), 0.25)
        expect(r.label).toBe('25')
        expect(r.label).not.toContain('.00')
    })

    it('showMin: true labels are unchanged (no min to restore)', async () => {
        const r = await dragTo({ entity: 'input_number.t', showValue: true, showMin: true }, inputNumber(80, 100, '90'), 0.9)
        expect(r.label).toBe('90')
    })
})
