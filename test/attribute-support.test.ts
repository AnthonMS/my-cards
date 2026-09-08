import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #48: `attribute:` support — read/write an entity ATTRIBUTE instead of
// the state. The canonical example is a humidifier's target humidity:
//     entity: humidifier.x
//     attribute: humidity
// Read: value from entity.attributes[attribute]; min/max default from
// min_<attribute>/max_<attribute> when present. Write: calls the domain's
// set_<attribute> service (humidifier.set_humidity { humidity: N }).
// With `attribute:` set the domain whitelist is bypassed; without it, nothing
// changes (pinned below + by the whole baseline suite).
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const makeHass = (entities: FakeEntity[]) => {
    const states: Record<string, FakeEntity> = {}
    for (const e of entities) states[e.entity_id] = e
    return { states, user: { name: 'tester' }, callService: vi.fn() }
}

const mountSlider = async (config: Record<string, any>, entities: FakeEntity[]) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = makeHass(entities)
    document.body.appendChild(el)
    await el.updateComplete
    return el
}

const containerOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement

const humidifier = (attrs: Record<string, any>): FakeEntity =>
    ({ entity_id: 'humidifier.h', state: 'on', attributes: attrs })

afterEach(() => {
    document.body.innerHTML = ''
})

describe('setConfig domain whitelist with attribute (#48)', () => {
    it('unsupported domain still throws WITHOUT attribute (unchanged)', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({ entity: 'humidifier.h' })).toThrow('Entity has to be one of the following')
    })

    it('unsupported domain is allowed WITH attribute', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({ entity: 'humidifier.h', attribute: 'humidity' })).not.toThrow()
    })
})

describe('attribute read path (#48)', () => {
    it('humidity 55 in min_humidity 30..max_humidity 70 => 25 / 62.5% (min shift, showMin default)', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity' },
            [humidifier({ humidity: 55, min_humidity: 30, max_humidity: 70 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('25')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('62.5')
    })

    it('showMin true: no shift => 55 / 78.57%', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity', showMin: true },
            [humidifier({ humidity: 55, min_humidity: 30, max_humidity: 70 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('55')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('78.57')
    })

    it('no min_/max_ attributes: defaults to 0..100', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity' },
            [humidifier({ humidity: 55 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('55')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('55')
    })

    it('explicit min/max override the entity attributes', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity', min: 50, max: 60, showMin: true },
            [humidifier({ humidity: 55, min_humidity: 30, max_humidity: 70 })])
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('91.67') // 55 of 60
    })

    it('missing/non-numeric attribute value falls back to 0', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity' },
            [humidifier({})])
        expect(containerOf(el).getAttribute('data-value')).toBe('0')
    })

    it('attribute works on whitelisted domains too and takes precedence over mode branches', async () => {
        const el = await mountSlider(
            { entity: 'fan.f', attribute: 'percentage' },
            [{ entity_id: 'fan.f', state: 'on', attributes: { percentage: 40 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('40')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('40')
    })

    it('sliderMin 20 rescales like other domains: 55 of 0..100 => 64 / 64%', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity', sliderMin: 20 },
            [humidifier({ humidity: 55 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('64')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('64')
    })
})

describe('attribute write path (#48)', () => {
    it('calls <domain>.set_<attribute> with the attribute as data key', async () => {
        const el = await mountSlider(
            { entity: 'humidifier.h', attribute: 'humidity' },
            [humidifier({ humidity: 55, min_humidity: 30, max_humidity: 70 })])
        // simulate the end of a user drag: setValue receives the slider-scale value
        el.actionTaken = true
        el.setValue(25, 62.5) // 25 on the shifted 0..40 scale = humidity 55
        expect(el.hass.callService).toHaveBeenCalledWith('humidifier', 'set_humidity', {
            entity_id: 'humidifier.h',
            humidity: 55,
        })
    })

    it('never falls through to the state-based domain services', async () => {
        const el = await mountSlider(
            { entity: 'light.a', attribute: 'brightness', max: 255, showMin: true },
            [{ entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } }])
        el.actionTaken = true
        el.setValue(128, 50)
        const calls = (el.hass.callService as any).mock.calls
        expect(calls).toHaveLength(1)
        expect(calls[0][0]).toBe('light')
        expect(calls[0][1]).toBe('set_brightness') // attribute convention, NOT turn_on
    })
})
