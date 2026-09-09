import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #77: a user reported that when the configured entity is unavailable
// (or unknown), the slider could still be dragged and would still write to
// the entity. The owner decided this is a bug, not an opt-in feature: the
// slider must ALWAYS (no config key) render and behave as disabled while its
// entity is unavailable/unknown.
//
// Root cause: none of the input handlers (startInput/moveInput/setValue) ever
// looked at entity.state - only at internal drag bookkeeping (actionTaken,
// isSliding, thumbTapped). A drag on an unavailable entity worked exactly like
// a drag on a live one, right down to the hass.callService call at the end.
//
// jsdom has no built-in <hui-error-card>. A present-but-unavailable entity
// does not actually take that fallback path (the entity exists in
// hass.states, just with state 'unavailable'/'unknown', so nothing throws
// while evaluating the config) - but the stub is registered anyway, exactly
// as test/issue-78-missing-entity-recovery.test.ts does, as cheap insurance:
// if render() ever did fall back to the error card, it would throw in jsdom
// and silently skip every lifecycle hook, which could make a test here pass
// for entirely the wrong reason.
// ============================================================================

class HuiErrorCard extends HTMLElement {
    setConfig(_c: any) { /* no-op stub */ }
}
if (!customElements.get('hui-error-card')) {
    customElements.define('hui-error-card', HuiErrorCard as any)
}

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const W = 200, H = 200

// Give the container real geometry so a drag produces a deterministic value,
// mirroring test/edge-coordinate.test.ts and test/issue-78-missing-entity-recovery.test.ts.
const layoutContainer = (container: HTMLElement) => {
    Object.defineProperty(container, 'offsetWidth', { value: W, configurable: true })
    Object.defineProperty(container, 'offsetHeight', { value: H, configurable: true })
    container.getBoundingClientRect = () => ({
        left: 0, top: 0, right: W, bottom: H, width: W, height: H, x: 0, y: 0, toJSON: () => ({}),
    }) as DOMRect
}

const waitForSliderEl = async (el: any, maxFrames = 50) => {
    for (let i = 0; i < maxFrames && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
}

const mount = async (state: string, attributes: Record<string, any> = {}) => {
    const entity: FakeEntity = { entity_id: 'light.a', state, attributes }
    const el = document.createElement('my-slider-v2') as any
    el.setConfig({ entity: 'light.a' })
    const hass = { states: { 'light.a': entity }, user: { name: 'tester' }, callService: vi.fn() }
    el.hass = hass
    document.body.appendChild(el)
    await el.updateComplete
    await waitForSliderEl(el)
    const container = el.shadowRoot.querySelector('.my-slider-custom-container') as HTMLElement
    layoutContainer(container)
    return { el, container, hass }
}

const mouseDrag = (container: HTMLElement, fromX: number, toX: number) => {
    container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: fromX, clientY: 5 }))
    document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: toX, clientY: 5 }))
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: toX, clientY: 5 }))
}

const touchEvent = (type: string, x: number) => {
    const e: any = new Event(type, { bubbles: true, cancelable: true })
    e.touches = [{ clientX: x, clientY: 5 }]
    e.changedTouches = [{ clientX: x, clientY: 5 }]
    return e
}

const touchDrag = (container: HTMLElement, fromX: number, toX: number) => {
    container.dispatchEvent(touchEvent('touchstart', fromX))
    container.dispatchEvent(touchEvent('touchmove', toX))
    document.dispatchEvent(touchEvent('touchend', toX))
}

afterEach(() => {
    document.body.innerHTML = ''
})

describe('#77: unavailable/unknown entity disables the slider', () => {
    it('(a) container gets my-slider-unavailable when state is unavailable', async () => {
        const { container } = await mount('unavailable')
        expect(container.classList.contains('my-slider-unavailable')).toBe(true)
    })

    it('(b) container gets my-slider-unavailable when state is unknown', async () => {
        const { container } = await mount('unknown')
        expect(container.classList.contains('my-slider-unavailable')).toBe(true)
    })

    it('(c) a full mouse drag while unavailable results in ZERO hass.callService calls', async () => {
        const { el, container, hass } = await mount('unavailable')
        mouseDrag(container, 40, 150)
        await el.updateComplete
        await new Promise(r => setTimeout(r, 80))
        expect(hass.callService, 'no service call from a drag on an unavailable entity').not.toHaveBeenCalled()
    })

    it('(d) a full touch drag while unavailable also results in ZERO hass.callService calls', async () => {
        const { el, container, hass } = await mount('unknown')
        touchDrag(container, 40, 150)
        await el.updateComplete
        await new Promise(r => setTimeout(r, 80))
        expect(hass.callService, 'no service call from a touch drag on an unknown entity').not.toHaveBeenCalled()
    })

    it('(e) unavailable -> a normal state removes the class, and a drag then DOES call the service', async () => {
        const { el, hass } = await mount('unavailable')
        let container = el.shadowRoot.querySelector('.my-slider-custom-container') as HTMLElement
        expect(container.classList.contains('my-slider-unavailable')).toBe(true)

        // Entity recovers - same call, no reload, must react both ways.
        el.hass = {
            states: { 'light.a': { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } } },
            user: { name: 'tester' },
            callService: hass.callService,
        }
        await el.updateComplete

        container = el.shadowRoot.querySelector('.my-slider-custom-container') as HTMLElement
        expect(container.classList.contains('my-slider-unavailable'), 'class removed once the entity recovers').toBe(false)
        layoutContainer(container)

        mouseDrag(container, 40, 150)
        await el.updateComplete
        await new Promise(r => setTimeout(r, 80))
        expect(hass.callService, 'drag after recovery must actually write the entity').toHaveBeenCalled()
    })

    it('(f) control: a normal available entity is completely unaffected', async () => {
        const { el, container, hass } = await mount('on', { brightness: 128 })
        expect(container.classList.contains('my-slider-unavailable')).toBe(false)
        mouseDrag(container, 40, 150)
        await el.updateComplete
        await new Promise(r => setTimeout(r, 80))
        expect(hass.callService, 'available entity keeps working exactly as before').toHaveBeenCalled()
    })
})
