import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #13: fan preset modes (Xiaomi Purifier 3H and similar).
//
// Some fans only accept a stepless percentage while in a particular preset
// ("Favorite"); set_percentage in another preset ("Fan") is stepped or ignored.
// Opt-in `presetMode:` switches the fan into the named preset BEFORE writing the
// percentage. Without the key the write path is byte-identical to before.
//
// NO HARDWARE was available to test this against a real fan, so these tests are
// the whole safety net. They pin: the untouched default path, the exact service
// call ORDER, that set_percentage is chained on set_preset_mode's resolved
// promise (not fired in parallel), the skip-when-already-in-preset path, the
// invalid-preset and unknown-list paths, the non-fan warning, and that a fast
// intermediate drag only switches the preset once.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

/** A promise we resolve by hand, to prove ordering across the .then() boundary. */
const deferred = () => {
    let resolve!: () => void
    const promise = new Promise<void>(r => { resolve = r })
    return { promise, resolve }
}

/**
 * Mount a slider with a callService we control. `calls` records every service
 * call as "domain.service" in order; `serviceImpl` can override what a given
 * call returns (default: an already-resolved promise) and can mutate state to
 * simulate HA's optimistic attribute update.
 */
const mountFan = async (
    config: Record<string, any>,
    entity: FakeEntity,
    serviceImpl?: (domain: string, service: string, data: any, entity: FakeEntity) => Promise<void> | void,
) => {
    const calls: string[] = []
    const payloads: any[] = []
    const callService = vi.fn((domain: string, service: string, data: any) => {
        calls.push(`${domain}.${service}`)
        payloads.push({ domain, service, data })
        const r = serviceImpl?.(domain, service, data, entity)
        return r instanceof Promise ? r : Promise.resolve()
    })
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService }
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    return { el, calls, payloads, callService }
}

const fan = (attrs: Record<string, any> = {}): FakeEntity =>
    ({ entity_id: 'fan.purifier', state: 'on', attributes: { percentage: 20, ...attrs } })

// let queued microtasks (the .then chain) run
const flush = async () => { await Promise.resolve(); await Promise.resolve() }

afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks() })

describe('#13 default fan behavior is unchanged', () => {
    it('no presetMode: only set_percentage, never set_preset_mode', async () => {
        const { el, calls, payloads } = await mountFan({ entity: 'fan.purifier' }, fan())
        el.actionTaken = true
        el.setValue(50, 50)
        await flush()
        expect(calls).toEqual(['fan.set_percentage'])
        expect(payloads[0].data).toEqual({ entity_id: 'fan.purifier', percentage: 50 })
    })

    it('presetMode set but fan already in that preset: percentage only', async () => {
        const { el, calls } = await mountFan(
            { entity: 'fan.purifier', presetMode: 'Favorite' },
            fan({ preset_mode: 'Favorite', preset_modes: ['Fan', 'Favorite'] }),
        )
        el.actionTaken = true
        el.setValue(50, 50)
        await flush()
        expect(calls).toEqual(['fan.set_percentage'])
    })
})

describe('#13 switching preset before writing percentage', () => {
    it('differing preset: set_preset_mode THEN set_percentage, in that order', async () => {
        const { el, calls, payloads } = await mountFan(
            { entity: 'fan.purifier', presetMode: 'Favorite' },
            fan({ preset_mode: 'Fan', preset_modes: ['Fan', 'Favorite'] }),
        )
        el.actionTaken = true
        el.setValue(60, 60)
        await flush()
        expect(calls).toEqual(['fan.set_preset_mode', 'fan.set_percentage'])
        expect(payloads[0]).toMatchObject({ service: 'set_preset_mode', data: { entity_id: 'fan.purifier', preset_mode: 'Favorite' } })
        expect(payloads[1]).toMatchObject({ service: 'set_percentage', data: { entity_id: 'fan.purifier', percentage: 60 } })
    })

    it('percentage is chained on the RESOLVED promise, not fired in parallel', async () => {
        const d = deferred()
        const { el, calls } = await mountFan(
            { entity: 'fan.purifier', presetMode: 'Favorite' },
            fan({ preset_mode: 'Fan', preset_modes: ['Fan', 'Favorite'] }),
            (_domain, service) => (service === 'set_preset_mode' ? d.promise : undefined),
        )
        el.actionTaken = true
        el.setValue(60, 60)
        await flush()
        // set_preset_mode is out, but set_percentage must NOT be until the preset resolves
        expect(calls).toEqual(['fan.set_preset_mode'])
        d.resolve()
        await flush()
        expect(calls).toEqual(['fan.set_preset_mode', 'fan.set_percentage'])
    })

    it('switches even when the fan omits its preset_modes list', async () => {
        // Some integrations do not publish preset_modes; a configured preset should still
        // be attempted rather than silently dropped.
        const { el, calls } = await mountFan(
            { entity: 'fan.purifier', presetMode: 'Favorite' },
            fan({ preset_mode: 'Fan' }), // no preset_modes attr
        )
        el.actionTaken = true
        el.setValue(60, 60)
        await flush()
        expect(calls).toEqual(['fan.set_preset_mode', 'fan.set_percentage'])
    })
})

describe('#13 invalid preset is survivable', () => {
    it('preset not in preset_modes: warn once, set percentage only', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const { el, calls } = await mountFan(
            { entity: 'fan.purifier', presetMode: 'Turbo' },
            fan({ preset_mode: 'Fan', preset_modes: ['Fan', 'Favorite'] }),
        )
        el.actionTaken = true
        el.setValue(50, 50)
        await flush()
        el.actionTaken = true
        el.setValue(70, 70)
        await flush()
        expect(calls).toEqual(['fan.set_percentage', 'fan.set_percentage'])
        expect(warn).toHaveBeenCalledTimes(1) // once, not per action
    })
})

describe('#13 presetMode on a non-fan entity', () => {
    it('warns once and is otherwise ignored', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const light: FakeEntity = { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } }
        const { el, calls } = await mountFan({ entity: 'light.a', presetMode: 'Favorite' }, light)
        el.actionTaken = true
        el.setValue(50, 50)
        await flush()
        // normal light write, no fan services, no preset services
        expect(calls.every(c => c.startsWith('light.'))).toBe(true)
        expect(warn).toHaveBeenCalled()
        // it renders more than once; make sure the warning is not spammed
        el.requestUpdate?.()
        await el.updateComplete
        expect(warn.mock.calls.filter(c => String(c[0]).includes('presetMode')).length).toBe(1)
    })
})

describe('#13 intermediate drag switches the preset only once', () => {
    it('two moves: one set_preset_mode, one set_percentage per move', async () => {
        // Simulate HA optimistically updating preset_mode the moment we switch it, so the
        // second move sees the fan already in Favorite.
        const { el, calls } = await mountFan(
            { entity: 'fan.purifier', presetMode: 'Favorite', intermediate: true },
            fan({ preset_mode: 'Fan', preset_modes: ['Fan', 'Favorite'] }),
            (_domain, service, _data, entity) => {
                if (service === 'set_preset_mode') entity.attributes.preset_mode = 'Favorite'
                return undefined
            },
        )
        el.actionTaken = true
        el.setValue(40, 40)
        await flush()
        el.actionTaken = true
        el.setValue(80, 80)
        await flush()
        const presetCalls = calls.filter(c => c === 'fan.set_preset_mode')
        const pctCalls = calls.filter(c => c === 'fan.set_percentage')
        expect(presetCalls.length, 'preset switched once').toBe(1)
        expect(pctCalls.length, 'percentage written both moves').toBe(2)
    })
})
