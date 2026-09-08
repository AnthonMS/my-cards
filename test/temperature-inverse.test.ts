import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #63: `inverse: true` with mode: temperature produced INVALID mireds.
// setValue mirrored with `max - val` AFTER min had been added back, yielding
// values below min_mireds (HA error: "value must be at least 1").
// The fix mirrors within the entity's real range; for min = 0 domains the
// formula reduces to the old one — proven by the brightness test below.
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

// Simulates the tail end of a user drag: setValue(val, percent) with an action pending,
// exactly what calcProgress/setProgress feed after a pointer release.
const userSets = (el: any, val: number, percent: number) => {
    el.hass.callService.mockClear()
    el.actionTaken = true
    el.setValue(val, percent)
    return el.hass.callService
}

afterEach(() => { document.body.innerHTML = '' })

const tempLight: FakeEntity = {
    entity_id: 'light.a', state: 'on',
    attributes: { color_temp: 300, min_mireds: 153, max_mireds: 500 },
}

describe('temperature + inverse (#63)', () => {
    it('mid-drag value stays inside the valid mireds range (was: 94, below min)', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature', inverse: true }, tempLight)
        const call = userSets(el, 100, 28.82)
        // internal 100 + min 153 = 253; mirrored in [153..500] => 653 - 253 = 400
        expect(call).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', color_temp: 400 })
    })

    it('far LEFT of an inverse slider sets the WARMEST valid value (max_mireds)', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature', inverse: true }, tempLight)
        const call = userSets(el, 0, 0)
        // 0 + 153 = 153; mirrored => 653 - 153 = 500 — exactly max_mireds, no HA error
        expect(call).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', color_temp: 500 })
    })

    it('far RIGHT of an inverse slider sets the COOLEST valid value (min_mireds)', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature', inverse: true }, tempLight)
        const call = userSets(el, 347, 100)
        // 347 + 153 = 500; mirrored => 653 - 500 = 153 — exactly min_mireds
        expect(call).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', color_temp: 153 })
    })

    it('showMin: true variant also mirrors within [min..max]', async () => {
        const el = await mountSlider(
            { entity: 'light.a', mode: 'temperature', inverse: true, showMin: true }, tempLight)
        // with showMin, val arrives on the full mireds scale already
        const call = userSets(el, 200, 40)
        // mirrored in [153..500] => 153 + 500 - 200 = 453
        expect(call).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', color_temp: 453 })
    })

    it('non-inverse temperature is untouched: value passes through', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, tempLight)
        const call = userSets(el, 100, 28.82)
        // pre-existing float noise (253 arrives as 252.99999999999997) — unchanged by this
        // branch; assert with tolerance so the characterization is robust
        expect(call).toHaveBeenCalledTimes(1)
        const [domain, service, data] = call.mock.calls[0]
        expect(domain).toBe('light')
        expect(service).toBe('turn_on')
        expect(data.entity_id).toBe('light.a')
        expect(data.color_temp).toBeCloseTo(253, 9)
    })
})

describe('min = 0 domains reduce to the previous formula (regression proof)', () => {
    it('brightness + inverse: same payload as before the fix', async () => {
        const el = await mountSlider({ entity: 'light.a', inverse: true },
            { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } })
        const call = userSets(el, 25, 25)
        // old: 100 - 25 = 75; new: 2*0 + 100 - 25 = 75 — identical
        expect(call).toHaveBeenCalledWith('light', 'turn_on', { entity_id: 'light.a', brightness: 75 * 2.56 })
    })

    it('media volume + inverse: same payload as before the fix', async () => {
        const el = await mountSlider({ entity: 'media_player.m', inverse: true },
            { entity_id: 'media_player.m', state: 'playing', attributes: { volume_level: 0.5 } })
        const call = userSets(el, 30, 30)
        // old: 100 - 30 = 70; new: identical (min 0)
        expect(call).toHaveBeenCalledWith('media_player', 'volume_set', { entity_id: 'media_player.m', volume_level: 0.7 })
    })
})
