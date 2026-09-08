import { describe, it, expect, afterEach, vi } from 'vitest'
import { miredsToKelvin, kelvinToMireds } from '../src/scripts/helpers'
import '../src/cards/my-slider'

// ============================================================================
// Issue #73: HA removed the deprecated `color_temp` (mireds) parameter from
// light.turn_on and newer installs may not expose the mireds attributes at all.
// The card keeps operating in mireds internally; these tests pin:
//   1. the pure mireds<->kelvin converters,
//   2. reading temperature from a modern (kelvin-only) light,
//   3. reading temperature from a legacy (mireds) light — unchanged behavior,
//   4. the service call payload: kelvin for modern lights, mireds for legacy.
// ============================================================================

describe('mireds <-> kelvin converters', () => {
    it('converts the classic HA range', () => {
        expect(kelvinToMireds(2000)).toBe(500)
        expect(kelvinToMireds(6536)).toBe(153)
        expect(miredsToKelvin(500)).toBe(2000)
        expect(miredsToKelvin(153)).toBe(6536)
        expect(miredsToKelvin(250)).toBe(4000)
        expect(kelvinToMireds(4000)).toBe(250)
    })

    it('rounds to whole numbers', () => {
        expect(kelvinToMireds(6535)).toBe(153)   // 153.02...
        expect(miredsToKelvin(300)).toBe(3333)   // 3333.33...
    })
})

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const mountSlider = async (config: Record<string, any>, entity: FakeEntity) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    return el
}

const containerOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement

afterEach(() => { document.body.innerHTML = '' })

describe('temperature mode reading (#73)', () => {
    it('legacy light (mireds attributes): unchanged behavior — 300 in 153..500 => 147 / 42.36%', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, {
            entity_id: 'light.a', state: 'on',
            attributes: { color_temp: 300, min_mireds: 153, max_mireds: 500 },
        })
        expect(containerOf(el).getAttribute('data-value')).toBe('147')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('42.36')
    })

    it('modern light (kelvin-only attributes): same slider position as the legacy equivalent', async () => {
        // kelvin 3333 ~= 300 mireds; min 2000 K ~= 500 mireds (max); max 6536 K ~= 153 mireds (min)
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, {
            entity_id: 'light.a', state: 'on',
            attributes: { color_temp_kelvin: 3333, min_color_temp_kelvin: 2000, max_color_temp_kelvin: 6536 },
        })
        expect(containerOf(el).getAttribute('data-value')).toBe('147')  // 300 - 153
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('42.36')
    })

    it('mixed attributes (transition-era HA): legacy mireds attributes win — identical result', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, {
            entity_id: 'light.a', state: 'on',
            attributes: {
                color_temp: 300, min_mireds: 153, max_mireds: 500,
                color_temp_kelvin: 3333, min_color_temp_kelvin: 2000, max_color_temp_kelvin: 6536,
            },
        })
        expect(containerOf(el).getAttribute('data-value')).toBe('147')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('42.36')
    })
})

describe('temperature mode service call (#73)', () => {
    it('modern light: sends color_temp_kelvin (converted from internal mireds)', async () => {
        const entity: FakeEntity = {
            entity_id: 'light.a', state: 'on',
            attributes: { color_temp_kelvin: 3333, min_color_temp_kelvin: 2000, max_color_temp_kelvin: 6536 },
        }
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, entity)
        el.hass.callService.mockClear()
        ;(el as any)._setColorTemp(entity, 300)
        expect(el.hass.callService).toHaveBeenCalledTimes(1)
        expect(el.hass.callService).toHaveBeenCalledWith('light', 'turn_on', {
            entity_id: 'light.a',
            color_temp_kelvin: 3333,
        })
    })

    it('legacy light: still sends color_temp in mireds (zero change for old HA)', async () => {
        const entity: FakeEntity = {
            entity_id: 'light.a', state: 'on',
            attributes: { color_temp: 300, min_mireds: 153, max_mireds: 500 },
        }
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, entity)
        el.hass.callService.mockClear()
        ;(el as any)._setColorTemp(entity, 300)
        expect(el.hass.callService).toHaveBeenCalledTimes(1)
        expect(el.hass.callService).toHaveBeenCalledWith('light', 'turn_on', {
            entity_id: 'light.a',
            color_temp: 300,
        })
    })

    it('light with only min/max kelvin (off, no current value): still prefers kelvin payload', async () => {
        const entity: FakeEntity = {
            entity_id: 'light.a', state: 'on',
            attributes: { min_color_temp_kelvin: 2000, max_color_temp_kelvin: 6536 },
        }
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' }, entity)
        el.hass.callService.mockClear()
        ;(el as any)._setColorTemp(entity, 500)
        expect(el.hass.callService).toHaveBeenCalledWith('light', 'turn_on', {
            entity_id: 'light.a',
            color_temp_kelvin: 2000,
        })
    })
})
