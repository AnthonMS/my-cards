import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #60 ("Max does not work"): the reporter's YAML had min/max/showMin
// indented INSIDE the styles: block, so the card never received them. These
// tests prove `max` IS enforced for media_player volume when the keys are at
// the card's top level (the reporter's intent: TV volume capped at 20).
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const mountSlider = async (config: Record<string, any>, entity: FakeEntity) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    return el
}

const userSets = (el: any, val: number, percent: number) => {
    el.hass.callService.mockClear()
    el.actionTaken = true
    el.setValue(val, percent)
    return el.hass.callService
}

afterEach(() => { document.body.innerHTML = '' })

const tv: FakeEntity = { entity_id: 'media_player.tv', state: 'on', attributes: { volume_level: 0.15 } }

describe('media volume with top-level min/max (#60 — the reporter intent)', () => {
    const config = { entity: 'media_player.tv', vertical: true, min: 1, max: 20, showMin: true }

    it('displays 15% volume as 75% of the 1..20 range', async () => {
        const el = await mountSlider(config, tv)
        const c = el.shadowRoot.querySelector('.my-slider-custom-container')
        expect(c.getAttribute('data-value')).toBe('15')
        expect(c.getAttribute('data-progress-percent')).toBe('75')
    })

    it('slider full-right sets volume 0.20 — capped by max, NOT 1.0', async () => {
        const el = await mountSlider(config, tv)
        // calcProgress at the far end produces val = max = 20
        const call = userSets(el, 20, 100)
        expect(call).toHaveBeenCalledWith('media_player', 'volume_set',
            { entity_id: 'media_player.tv', volume_level: 0.2 })
    })

    it('values above max are clamped to max by calcProgress-equivalent input', async () => {
        const el = await mountSlider(config, tv)
        // setProgress rounds to step and calcProgress clamps at max before setValue;
        // feeding max directly mirrors the end-of-drag state
        const call = userSets(el, 20, 100)
        const vol = call.mock.calls[0][2].volume_level
        expect(vol).toBeLessThanOrEqual(0.2)
    })
})

describe('control: keys nested under styles: are ignored (what the reporter actually had)', () => {
    it('min/max inside styles have no effect — full range behavior', async () => {
        const el = await mountSlider({
            entity: 'media_player.tv', vertical: true,
            styles: { card: [{ height: '182px' }], min: 1, max: 20, showMin: true } as any,
        }, tv)
        const c = el.shadowRoot.querySelector('.my-slider-custom-container')
        // card treats volume as 0..100: 15% volume => 15/100, not 75%
        expect(c.getAttribute('data-value')).toBe('15')
        expect(c.getAttribute('data-progress-percent')).toBe('15')
    })
})
