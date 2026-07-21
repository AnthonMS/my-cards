import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #58: slide-to-run scripts. `entity: script.x` behaves like the existing
// switch/lock pattern — the bar rests at minThreshold, sliding past maxThreshold
// calls script.turn_on, and the slider snaps back. Momentary: it does NOT track
// the script's own on/off state.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const script: FakeEntity = { entity_id: 'script.all_off', state: 'off', attributes: { friendly_name: 'All Off' } }

const mount = async (config: Record<string, any>, entities: FakeEntity[] = [script]) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    const states: Record<string, FakeEntity> = {}
    for (const e of entities) states[e.entity_id] = e
    const hass = { states, user: { name: 'tester' }, callService: vi.fn() }
    el.hass = hass
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    return { el, hass }
}

const containerOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement
const progressOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-progress') as HTMLElement

afterEach(() => { document.body.innerHTML = ''; vi.useRealTimers() })

describe('#58 setConfig accepts the script domain', () => {
    it('accepts script.x', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({ entity: 'script.all_off' })).not.toThrow()
    })

    it('still rejects an unlisted domain without attribute (contract unchanged)', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({ entity: 'sensor.foo' })).toThrow(/Entity has to be one of the following/)
    })

    it('the error message now advertises script', () => {
        const el = document.createElement('my-slider-v2') as any
        try {
            el.setConfig({ entity: 'sensor.foo' })
            throw new Error('should have thrown')
        } catch (e: any) {
            expect(e.message).toContain('script')
        }
    })

    it('#48 attribute bypass still works for unlisted domains', () => {
        const el = document.createElement('my-slider-v2') as any
        expect(() => el.setConfig({ entity: 'humidifier.h', attribute: 'humidity' })).not.toThrow()
    })
})

describe('#58 resting position', () => {
    it('rests at the default minThreshold of 15', async () => {
        const { el } = await mount({ entity: 'script.all_off' })
        expect(containerOf(el).getAttribute('data-value')).toBe('15')
    })

    it('respects a custom minThreshold', async () => {
        const { el } = await mount({ entity: 'script.all_off', minThreshold: 30 })
        expect(containerOf(el).getAttribute('data-value')).toBe('30')
    })

    it('does not track the script state (still rests while the script runs)', async () => {
        const running: FakeEntity = { ...script, state: 'on' }
        const { el } = await mount({ entity: 'script.all_off' }, [running])
        expect(containerOf(el).getAttribute('data-value')).toBe('15')
    })
})

describe('#58 firing the script', () => {
    it('past maxThreshold calls script.turn_on with the entity_id', async () => {
        const { el, hass } = await mount({ entity: 'script.all_off' })
        el.actionTaken = true
        el.setValue(96, 96)
        expect(hass.callService).toHaveBeenCalledWith('script', 'turn_on', { entity_id: 'script.all_off' })
    })

    it('below the threshold does NOT fire', async () => {
        const { el, hass } = await mount({ entity: 'script.all_off' })
        el.actionTaken = true
        el.setValue(50, 50)
        expect(hass.callService).not.toHaveBeenCalled()
    })

    it('respects a custom maxThreshold', async () => {
        const { el, hass } = await mount({ entity: 'script.all_off', maxThreshold: 50 })
        el.actionTaken = true
        el.setValue(60, 60)
        expect(hass.callService).toHaveBeenCalledWith('script', 'turn_on', { entity_id: 'script.all_off' })
    })

    it('snaps back to minThreshold after firing', async () => {
        const { el } = await mount({ entity: 'script.all_off' })
        // fake timers only AFTER mount — mount awaits requestAnimationFrame
        vi.useFakeTimers()
        el.actionTaken = true
        el.setValue(96, 96)
        expect(progressOf(el).style.width).toBe('15%')
    })

    it('restores the original transition 200ms after the snap-back', async () => {
        const { el } = await mount({ entity: 'script.all_off' })
        // The card's default progress transition happens to BE 'width 0.2s ease 0s',
        // so the restore is invisible with stock styles. Swap in a sentinel so the
        // assertion actually proves the timer ran and put the old value back.
        el.initialTransition = 'none 0s ease 0s'
        vi.useFakeTimers()
        el.actionTaken = true
        el.setValue(96, 96)
        expect(progressOf(el).style.transition, 'animating during snap-back').toBe('width 0.2s ease 0s')
        vi.advanceTimersByTime(250)
        expect(progressOf(el).style.transition, 'restored afterwards').toBe('none 0s ease 0s')
    })

    it('snaps back even when the value was below the threshold', async () => {
        const { el } = await mount({ entity: 'script.all_off' })
        el.actionTaken = true
        el.setValue(50, 50)
        expect(progressOf(el).style.width).toBe('15%')
    })
})

describe('#58 the snap-back must not trigger UI meant for user gestures', () => {
    it("the 'setScript' action does not show the showValue bubble", async () => {
        const { el } = await mount({ entity: 'script.all_off', showValue: true })
        const valueEl = () => el.shadowRoot!.querySelector('.my-slider-custom-value') as HTMLElement
        expect(valueEl().style.display).toBe('none')
        el.actionTaken = true
        el.setValue(96, 96)
        // setProgress(..., 'setScript') runs inside _setScript; the bubble gate only
        // accepts mouse/touch action names, so it must stay hidden.
        expect(valueEl().style.display).toBe('none')
    })
})

describe('#58 end-to-end through the pointer path', () => {
    const W = 200
    it('a slide to the far right fires the script once', async () => {
        const { el, hass } = await mount({ entity: 'script.all_off', allowTapping: false, allowSliding: true })
        const c = containerOf(el)
        Object.defineProperty(c, 'offsetWidth', { value: W, configurable: true })
        Object.defineProperty(c, 'offsetHeight', { value: 50, configurable: true })
        c.getBoundingClientRect = () => ({ left: 0, top: 0, right: W, bottom: 50, width: W, height: 50, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect

        c.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 20, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 120, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 198, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 198, clientY: 5 }))
        await el.updateComplete

        const fires = (hass.callService as any).mock.calls.filter((c: any[]) => c[1] === 'turn_on')
        expect(fires.length, 'fired exactly once').toBe(1)
    })

    it('allowTapping:false means a plain tap does NOT fire it', async () => {
        const { el, hass } = await mount({ entity: 'script.all_off', allowTapping: false })
        const c = containerOf(el)
        Object.defineProperty(c, 'offsetWidth', { value: W, configurable: true })
        Object.defineProperty(c, 'offsetHeight', { value: 50, configurable: true })
        c.getBoundingClientRect = () => ({ left: 0, top: 0, right: W, bottom: 50, width: W, height: 50, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect

        c.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 198, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 198, clientY: 5 }))
        await el.updateComplete
        expect(hass.callService).not.toHaveBeenCalled()
    })
})
