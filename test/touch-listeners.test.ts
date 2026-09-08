import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #64: Chrome logs "[Violation] Added non-passive event listener to a
// scroll-blocking 'touchstart'/'touchmove' event" for every slider.
// touchstart's handler never calls preventDefault, so it is now registered
// passive. touchmove MUST stay non-passive while disableScroll is true
// (default) because preventDefault there is the documented disableScroll
// feature; with disableScroll: false it is registered passive.
// These tests capture the actual addEventListener options lit passes, and
// prove the handlers still fire.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

let captured: Array<{ type: string; options: any }> = []
const origAdd = Element.prototype.addEventListener

beforeEach(() => {
    captured = []
    Element.prototype.addEventListener = function (type: any, listener: any, options: any) {
        if (type === 'touchstart' || type === 'touchmove') captured.push({ type, options })
        return origAdd.call(this, type, listener, options)
    } as any
})

afterEach(() => {
    Element.prototype.addEventListener = origAdd
    document.body.innerHTML = ''
})

const mountSlider = async (config: Record<string, any>) => {
    const entity: FakeEntity = { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } }
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { 'light.a': entity }, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    return el
}

// The card grabs its container reference (sliderEl) inside a requestAnimationFrame
// callback after first render. Input handlers that run before that frame can see it
// undefined, so tests that dispatch events must wait for it — otherwise this suite is
// timing-dependent (it flaked on Windows while passing in CI-like environments).
const waitForSliderEl = async (el: any) => {
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    expect(el.sliderEl, 'sliderEl set after first frame').toBeTruthy()
}

const optionsFor = (type: string) => {
    const entries = captured.filter(c => c.type === type)
    expect(entries.length, `${type} listener registered`).toBeGreaterThan(0)
    return entries[entries.length - 1].options
}

const isPassive = (o: any) => !!(o && typeof o === 'object' && o.passive === true)

describe('listener registration options (#64)', () => {
    it('touchstart is registered passive', async () => {
        await mountSlider({ entity: 'light.a' })
        expect(isPassive(optionsFor('touchstart'))).toBe(true)
    })

    it('touchmove stays NON-passive with default disableScroll: true (preventDefault must work)', async () => {
        await mountSlider({ entity: 'light.a' })
        expect(isPassive(optionsFor('touchmove'))).toBe(false)
    })

    it('touchmove is passive when disableScroll: false', async () => {
        await mountSlider({ entity: 'light.a', disableScroll: false })
        expect(isPassive(optionsFor('touchmove'))).toBe(true)
    })
})

describe('handlers still fire through the object-listener binding', () => {
    const touchEvent = (type: string) => {
        const e = new Event(type, { bubbles: true, cancelable: true })
        ;(e as any).touches = [{ clientX: 5, clientY: 5 }]
        return e
    }

    it('touchstart still reaches startInput (sets touchInput flag)', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        await waitForSliderEl(el)
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        expect(el.touchInput).toBe(false)
        container.dispatchEvent(touchEvent('touchstart'))
        expect(el.touchInput).toBe(true)
    })

    it('touchmove still reaches the handler without throwing', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        await waitForSliderEl(el)
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        container.dispatchEvent(touchEvent('touchstart'))
        expect(() => container.dispatchEvent(touchEvent('touchmove'))).not.toThrow()
    })

    it('mouse path is untouched: mousedown sets actionTaken (allowTapping default)', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        await waitForSliderEl(el)
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        const e = new MouseEvent('mousedown', { bubbles: true, clientX: 5, clientY: 5 })
        container.dispatchEvent(e)
        expect(el.actionTaken).toBe(true)
    })
})


// ============================================================================
// intermediate:true touch drag regression. intermediate now re-renders mid-drag
// (setValue on the first touchmove updates the entity). When touchmove lived on
// the lit @touchmove binding, its { handleEvent } value was a new object each
// render, so lit removed + re-added the listener on every one of those mid-drag
// renders. On touch that churn dropped the gesture: the slider snapped to the
// tap position and stopped following the finger (mouse was fine — mousemove is on
// document). touchmove is now bound once on the container in firstUpdated, so it
// must survive re-renders untouched.
// ============================================================================
describe('intermediate touch drag survives mid-drag re-renders', () => {
    const touchAt = (type: string, x: number) => {
        const e = new Event(type, { bubbles: true, cancelable: true })
        ;(e as any).touches = [{ clientX: x, clientY: 5 }]
        ;(e as any).clientX = x
        ;(e as any).clientY = 5
        return e
    }

    it('touchmove is registered once on the container and never churned across renders', async () => {
        const el = await mountSlider({ entity: 'light.a', intermediate: true, allowTapping: true })
        await waitForSliderEl(el)
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')

        const added: string[] = []
        const removed: string[] = []
        const origAddEl = container.addEventListener.bind(container)
        const origRemEl = container.removeEventListener.bind(container)
        container.addEventListener = (t: any, ...rest: any[]) => { if (t === 'touchmove') added.push(t); return origAddEl(t, ...rest) }
        container.removeEventListener = (t: any, ...rest: any[]) => { if (t === 'touchmove') removed.push(t); return origRemEl(t, ...rest) }

        // Force the kind of re-renders an intermediate drag produces.
        for (let i = 0; i < 3; i++) { el.requestUpdate(); await el.updateComplete }

        // The stable listener must not be removed/re-added by rendering.
        expect(removed, 'touchmove listener must not be removed on re-render').toHaveLength(0)
        expect(added, 'touchmove listener must not be re-added on re-render').toHaveLength(0)
    })
})
