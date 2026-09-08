import { describe, it, expect, afterEach, vi } from 'vitest'

// Importing the card registers the <my-slider-v2> custom element (side effect).
import '../src/cards/my-slider'

// ============================================================================
// CHARACTERIZATION / DOM-CONTRACT TESTS for my-slider-v2
//
// These mount the real card in jsdom with a fake `hass` and pin:
//   1. The DOM structure + CSS class names downstream cards/user CSS depend on:
//      ha-card.my-slider-custom-card > .my-slider-custom-container >
//      .my-slider-custom-track > .my-slider-custom-progress > .my-slider-custom-thumb
//      (+ id, data-value, data-progress-percent on the container)
//   2. The per-domain value math (sliderMin / showMin / min / max / inverse)
//      exactly as it behaves today on `beta`. Expected values encode
//      "what it does today", bugs and all.
//
// If a refactor changes any expected value here, the refactor changed behavior.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const makeHass = (entities: FakeEntity[]) => {
    const states: Record<string, FakeEntity> = {}
    for (const e of entities) states[e.entity_id] = e
    return {
        states,
        user: { name: 'tester' },
        callService: vi.fn(),
    }
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

afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
})

// ---------------------------------------------------------------------------
// DOM structure contract
// ---------------------------------------------------------------------------
describe('DOM contract', () => {
    const light: FakeEntity = { entity_id: 'light.test_light', state: 'on', attributes: { brightness: 128 } }

    it('renders the exact class hierarchy downstream cards depend on', async () => {
        // (parentElement checks instead of :scope — jsdom's :scope support is unreliable)
        const el = await mountSlider({ entity: 'light.test_light' }, [light])
        const root = el.shadowRoot!

        const card = root.querySelector('ha-card.my-slider-custom-card')
        expect(card, 'ha-card.my-slider-custom-card').toBeTruthy()

        const container = root.querySelector('.my-slider-custom-container')
        expect(container, 'container exists').toBeTruthy()
        expect(container!.parentElement, 'container directly under card').toBe(card)

        const track = root.querySelector('.my-slider-custom-track')
        expect(track, 'track exists').toBeTruthy()
        expect(track!.parentElement, 'track directly under container').toBe(container)

        const progress = root.querySelector('.my-slider-custom-progress')
        expect(progress, 'progress exists').toBeTruthy()
        expect(progress!.parentElement, 'progress directly under track').toBe(track)

        const thumb = root.querySelector('.my-slider-custom-thumb')
        expect(thumb, 'thumb exists').toBeTruthy()
        expect(thumb!.parentElement, 'thumb directly under progress').toBe(progress)
    })

    it('container id: default sliderId uses the RAW config mode — literally "undefined" when mode is not set (characterization)', async () => {
        // sliderId is built from `this._config.mode` BEFORE mode defaulting happens,
        // so without an explicit `mode:` the id ends in "-undefined". Pinned as-is;
        // see docs/FABLE_FINDINGS.md.
        const el = await mountSlider({ entity: 'light.test_light' }, [light])
        const container = containerOf(el)
        expect(container.id).toBe('slider-light-test_light-undefined')
        expect(container.getAttribute('data-value')).toBe('50')
        expect(container.getAttribute('data-progress-percent')).toBe('50')
    })

    it('container id includes the mode when the user sets mode explicitly', async () => {
        const el = await mountSlider({ entity: 'light.test_light', mode: 'brightness' }, [light])
        expect(containerOf(el).id).toBe('slider-light-test_light-brightness')
    })

    it('respects a user-supplied sliderId', async () => {
        const el = await mountSlider({ entity: 'light.test_light', sliderId: 'my-custom-id' }, [light])
        expect(containerOf(el).id).toBe('my-custom-id')
    })

    it('horizontal slider expresses progress as style.width', async () => {
        const el = await mountSlider({ entity: 'light.test_light' }, [light])
        const progress = el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement
        expect(progress.style.width).toBe('50%')
    })

    it('setConfig throws without entity', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({})).toThrow('You need to define entity')
    })

    it('setConfig throws for unsupported domains', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({ entity: 'sensor.foo' })).toThrow('Entity has to be one of the following')
    })
})

// ---------------------------------------------------------------------------
// LIGHT — brightness / temperature / hue / saturation
// ---------------------------------------------------------------------------
describe('light', () => {
    const lightOn = (attrs: Record<string, any>): FakeEntity =>
        ({ entity_id: 'light.a', state: 'on', attributes: attrs })

    it('brightness: 128/256 => 50 / 50%', async () => {
        const el = await mountSlider({ entity: 'light.a' }, [lightOn({ brightness: 128 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('50')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })

    it('brightness: light off => 0 / 0%', async () => {
        const el = await mountSlider({ entity: 'light.a' },
            [{ entity_id: 'light.a', state: 'off', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('0')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('0')
    })

    it('brightness + sliderMin 20: on at 50% => 60 / 60% (rescaled into 20..100)', async () => {
        const el = await mountSlider({ entity: 'light.a', sliderMin: 20 }, [lightOn({ brightness: 128 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('60')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('60')
    })

    it('brightness + sliderMin 20: light OFF rests at the sliderMin floor => 20 / 20%', async () => {
        // This is the exact area of the recent sliderMin bug fixes (535b281, 123e142)
        const el = await mountSlider({ entity: 'light.a', sliderMin: 20 },
            [{ entity_id: 'light.a', state: 'off', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('20')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('20')
    })

    it('brightness + min 10 (showMin default false): value shifted AND max shrunk => 40 / 44.44%', async () => {
        // Updated after PR #74 ("Bug: min not handled correct fix", 123e142) was merged into
        // beta: the brightness branch now also shrinks max by min, consistent with
        // temperature/hue/saturation/number. 50% brightness with min 10 => value 40 of
        // range 90 => 44.44%. (The previously pinned pre-fix behavior was 40 / 40%;
        // see docs/FABLE_FINDINGS.md F-8 for the history.)
        const el = await mountSlider({ entity: 'light.a', min: 10 }, [lightOn({ brightness: 128 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('40')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('44.44')
    })

    it('brightness + min 10 + showMin true: no shift => 50 / 50%', async () => {
        const el = await mountSlider({ entity: 'light.a', min: 10, showMin: true }, [lightOn({ brightness: 128 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('50')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })

    it('brightness + inverse: 25% brightness shows 75 / 75%', async () => {
        const el = await mountSlider({ entity: 'light.a', inverse: true }, [lightOn({ brightness: 64 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('75')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('75')
    })

    it('temperature: mireds mapped into min..max_mireds => 147 / 42.36%', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'temperature' },
            [lightOn({ color_temp: 300, min_mireds: 153, max_mireds: 500 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('147')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('42.36')
    })

    it('hue (color_mode hs): hue 180 of 360 => 180 / 50%', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'hue' },
            [lightOn({ color_mode: 'hs', hs_color: [180, 50] })])
        expect(containerOf(el).getAttribute('data-value')).toBe('180')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })

    it('saturation (color_mode hs): sat 50 of 100 => 50 / 50%', async () => {
        const el = await mountSlider({ entity: 'light.a', mode: 'saturation' },
            [lightOn({ color_mode: 'hs', hs_color: [180, 50] })])
        expect(containerOf(el).getAttribute('data-value')).toBe('50')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })
})

// ---------------------------------------------------------------------------
// INPUT_NUMBER / NUMBER — min/max/step from entity attributes unless overridden
// ---------------------------------------------------------------------------
describe('input_number / number', () => {
    it('state 25 in 0..50 => 25 / 50%', async () => {
        const el = await mountSlider({ entity: 'input_number.n' },
            [{ entity_id: 'input_number.n', state: '25', attributes: { min: 0, max: 50, step: 1 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('25')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })

    it('entity min 10 shifts range: state 25 in 10..50 => 15 / 37.5%', async () => {
        const el = await mountSlider({ entity: 'input_number.n' },
            [{ entity_id: 'input_number.n', state: '25', attributes: { min: 10, max: 50, step: 1 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('15')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('37.5')
    })

    it('number domain behaves the same', async () => {
        const el = await mountSlider({ entity: 'number.n' },
            [{ entity_id: 'number.n', state: '25', attributes: { min: 0, max: 50, step: 1 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('25')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })
})

// ---------------------------------------------------------------------------
// MEDIA_PLAYER — volume & seekbar
// ---------------------------------------------------------------------------
describe('media_player', () => {
    it('volume: volume_level 0.5 => 50 / 50%', async () => {
        const el = await mountSlider({ entity: 'media_player.m' },
            [{ entity_id: 'media_player.m', state: 'playing', attributes: { volume_level: 0.5 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('50')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('50')
    })

    it('volume + sliderMin 20 => 60 / 60%', async () => {
        const el = await mountSlider({ entity: 'media_player.m', sliderMin: 20 },
            [{ entity_id: 'media_player.m', state: 'playing', attributes: { volume_level: 0.5 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('60')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('60')
    })

    it('volume: missing volume_level => 0 / 0%', async () => {
        const el = await mountSlider({ entity: 'media_player.m' },
            [{ entity_id: 'media_player.m', state: 'idle', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('0')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('0')
    })

    it('seekbar (paused, so no polling): position 50 of duration 200 => 50 / 25%', async () => {
        // Freeze Date only (not rAF/promises) so media_position math is exact.
        const t = new Date('2026-01-01T12:00:00.000Z')
        vi.useFakeTimers({ toFake: ['Date'] })
        vi.setSystemTime(t)
        const el = await mountSlider({ entity: 'media_player.m', mode: 'seekbar' },
            [{
                entity_id: 'media_player.m', state: 'paused', attributes: {
                    media_duration: 200,
                    media_position: 50,
                    media_position_updated_at: t.toISOString(),
                },
            }])
        expect(containerOf(el).getAttribute('data-value')).toBe('50')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('25')
    })
})

// ---------------------------------------------------------------------------
// COVER — defaults to vertical + flipped + inverse
// ---------------------------------------------------------------------------
describe('cover', () => {
    const cover = (attrs: Record<string, any>): FakeEntity =>
        ({ entity_id: 'cover.c', state: 'open', attributes: attrs })

    it('position 30 with default inverse => 70 / 70%', async () => {
        const el = await mountSlider({ entity: 'cover.c' }, [cover({ current_position: 30 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('70')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('70')
    })

    it('defaults to vertical: progress expressed as style.height', async () => {
        const el = await mountSlider({ entity: 'cover.c' }, [cover({ current_position: 30 })])
        const progress = el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement
        expect(progress.style.height).toBe('70%')
    })

    it('position + sliderMin 10 => 73 / 73%', async () => {
        const el = await mountSlider({ entity: 'cover.c', sliderMin: 10 }, [cover({ current_position: 30 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('73')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('73')
    })

    it('explicit inverse: false is overridden back to true today (characterization)', async () => {
        // NOTE current code: `defaultConfig.inverse = this._config.inverse ? this._config.inverse : true`
        // means an explicit `inverse: false` still becomes true. Pinned as-is.
        const el = await mountSlider({ entity: 'cover.c', inverse: false }, [cover({ current_position: 30 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('70')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('70')
    })

    it('tilt mode reads current_tilt_position: 40 => 60 / 60%', async () => {
        const el = await mountSlider({ entity: 'cover.c', mode: 'tilt' }, [cover({ current_tilt_position: 40 })])
        expect(containerOf(el).getAttribute('data-value')).toBe('60')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('60')
    })
})

// ---------------------------------------------------------------------------
// FAN / SWITCH / INPUT_BOOLEAN / LOCK
// ---------------------------------------------------------------------------
describe('fan / switch / input_boolean / lock', () => {
    it('fan: percentage attr 40 => 40 / 40%', async () => {
        const el = await mountSlider({ entity: 'fan.f' },
            [{ entity_id: 'fan.f', state: 'on', attributes: { percentage: 40 } }])
        expect(containerOf(el).getAttribute('data-value')).toBe('40')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('40')
    })

    it('switch: rests at default minThreshold => 15 / 15 (percent NOT normalized — characterization)', async () => {
        const el = await mountSlider({ entity: 'switch.s' },
            [{ entity_id: 'switch.s', state: 'on', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('15')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('15')
    })

    it('switch: custom minThreshold 30 => 30 / 30', async () => {
        const el = await mountSlider({ entity: 'switch.s', minThreshold: 30 },
            [{ entity_id: 'switch.s', state: 'on', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('30')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('30')
    })

    it('input_boolean: no value branch => 0 / 0', async () => {
        const el = await mountSlider({ entity: 'input_boolean.b' },
            [{ entity_id: 'input_boolean.b', state: 'on', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('0')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('0')
    })

    it('lock: rests at default minThreshold => 15 / 15', async () => {
        const el = await mountSlider({ entity: 'lock.l' },
            [{ entity_id: 'lock.l', state: 'locked', attributes: {} }])
        expect(containerOf(el).getAttribute('data-value')).toBe('15')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('15')
    })
})

// ---------------------------------------------------------------------------
// Templated config ([[[ ... ]]]) flows through initializeConfig
// ---------------------------------------------------------------------------
describe('templating integration', () => {
    it('a templated sliderMin is evaluated before the math runs', async () => {
        const el = await mountSlider(
            { entity: 'light.a', sliderMin: '[[[ return 10 + 10 ]]]' },
            [{ entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } }])
        // same expectation as literal sliderMin: 20
        expect(containerOf(el).getAttribute('data-value')).toBe('60')
        expect(containerOf(el).getAttribute('data-progress-percent')).toBe('60')
    })
})
