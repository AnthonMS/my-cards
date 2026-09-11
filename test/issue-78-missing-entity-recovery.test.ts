import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #78: my-slider-v2 is permanently inert if it first renders before its
// entity exists (e.g. right after a Home Assistant restart, while the browser
// still has the dashboard open from before).
//
// Root cause: when the configured entity is missing from hass.states,
// initializeConfig() throws while evaluating the config (a template like
// `max: '[[[ return entity.attributes.brightness + 10 ]]]'` dereferences the
// undefined entity) and render() falls back to an <hui-error-card> instead of
// the real slider markup. There is no '.my-slider-custom-container' anywhere
// in the shadow root on that render.
//
// updated()'s rAF callback used to assign `this.sliderEl = shadowRoot.querySelector(...)`
// unconditionally, so it latched onto `null`. Its retry guard tested
// `=== undefined`, which is now permanently false, so it never looked again -
// even after the entity showed up and a normal slider rendered on a later
// update. Every drag afterwards silently did nothing (moveInput/calcProgress
// both bail out on a null/undefined sliderEl).
//
// Separately, firstUpdated() (which lit calls exactly once) attached the
// touchmove listener straight onto the container. When that one-and-only call
// landed on the error-card render, there was no container to attach to, and
// the listener was never retried either - so touch devices stayed dead even
// after the mouse path recovered.
//
// jsdom has no built-in <hui-error-card>, so without registering a stub for it
// `errorCard.setConfig` is not a function, render() throws before updated()
// ever runs, and the bug appears to not reproduce at all. The stub below is
// required for this file to actually exercise the bug.
// ============================================================================

class HuiErrorCard extends HTMLElement {
    setConfig(_c: any) { /* no-op stub */ }
}
if (!customElements.get('hui-error-card')) {
    customElements.define('hui-error-card', HuiErrorCard as any)
}

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const W = 200, H = 200

// A template on `max` that dereferences `entity` - throws while the entity is
// missing (entity is undefined), which is exactly the path that produces the
// hui-error-card fallback described in the issue.
const MISSING_ENTITY_CONFIG = { entity: 'light.x', max: '[[[ return entity.attributes.brightness + 10 ]]]' }

const hassMissing = () => ({ states: {}, user: { name: 'tester' }, callService: vi.fn() })
const hassPresent = (brightness = 128) => ({
    states: {
        'light.x': { entity_id: 'light.x', state: 'on', attributes: { brightness } } as FakeEntity,
    },
    user: { name: 'tester' },
    callService: vi.fn(),
})

const waitFrames = async (n: number) => {
    for (let i = 0; i < n; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
}

const waitForSliderEl = async (el: any, maxFrames = 50) => {
    for (let i = 0; i < maxFrames && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
}

// Give the container real geometry so calcProgress produces a deterministic value,
// mirroring test/edge-coordinate.test.ts.
const layoutContainer = (container: HTMLElement) => {
    Object.defineProperty(container, 'offsetWidth', { value: W, configurable: true })
    Object.defineProperty(container, 'offsetHeight', { value: H, configurable: true })
    container.getBoundingClientRect = () => ({
        left: 0, top: 0, right: W, bottom: H, width: W, height: H, x: 0, y: 0, toJSON: () => ({}),
    }) as DOMRect
}

afterEach(() => {
    document.body.innerHTML = ''
})

describe('#78: entity missing on first render', () => {
    it('1. sliderEl is acquired once the entity appears, not stuck null forever', async () => {
        const el = document.createElement('my-slider-v2') as any
        el.setConfig(MISSING_ENTITY_CONFIG)
        el.hass = hassMissing()
        document.body.appendChild(el)
        await el.updateComplete

        // Confirm we actually hit the error-card path: no slider markup at all.
        expect(el.shadowRoot.querySelector('.my-slider-custom-container')).toBeNull()

        // Give the (possibly buggy) rAF acquisition callback a few frames to run
        // against the error-card render, the way it would in a live browser tab
        // left open across a Home Assistant restart.
        await waitFrames(3)

        // Now the entity shows up and the card can render normally.
        el.hass = hassPresent()
        await el.updateComplete
        await waitForSliderEl(el)

        expect(el.sliderEl, 'sliderEl must be acquired after the entity appears').toBeTruthy()
        expect(el.shadowRoot.querySelector('.my-slider-custom-container')).not.toBeNull()
    })

    it('2. after recovery, a full mousedown -> mousemove -> mouseup drag calls hass.callService', async () => {
        const el = document.createElement('my-slider-v2') as any
        el.setConfig(MISSING_ENTITY_CONFIG)
        el.hass = hassMissing()
        document.body.appendChild(el)
        await el.updateComplete
        await waitFrames(3)

        el.hass = hassPresent()
        await el.updateComplete
        await waitForSliderEl(el)

        const container = el.shadowRoot.querySelector('.my-slider-custom-container') as HTMLElement
        layoutContainer(container)

        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 60, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 150, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 150, clientY: 5 }))
        await el.updateComplete
        await new Promise(r => setTimeout(r, 80))

        expect(el.hass.callService, 'drag after recovery must actually write the entity (was 0 calls)').toHaveBeenCalled()
    })

    it('3. after recovery, the touchmove listener is attached to the (new) container', async () => {
        const captured: Array<{ type: string; target: EventTarget }> = []
        const origAdd = Element.prototype.addEventListener
        Element.prototype.addEventListener = function (type: any, listener: any, options: any) {
            if (type === 'touchmove') captured.push({ type, target: this })
            return origAdd.call(this, type, listener, options)
        } as any

        try {
            const el = document.createElement('my-slider-v2') as any
            el.setConfig(MISSING_ENTITY_CONFIG)
            el.hass = hassMissing()
            document.body.appendChild(el)
            await el.updateComplete
            await waitFrames(3)

            el.hass = hassPresent()
            await el.updateComplete
            await waitForSliderEl(el)

            const container = el.shadowRoot.querySelector('.my-slider-custom-container')
            const onContainer = captured.filter(c => c.target === container)
            expect(onContainer.length, 'touchmove must be attached to the container once it exists').toBeGreaterThan(0)
        } finally {
            Element.prototype.addEventListener = origAdd
        }
    })

    it('4. steady state: the touchmove listener attaches exactly once and is not re-added across later updates', async () => {
        const captured: Array<{ type: string; target: EventTarget }> = []
        const origAdd = Element.prototype.addEventListener
        Element.prototype.addEventListener = function (type: any, listener: any, options: any) {
            if (type === 'touchmove') captured.push({ type, target: this })
            return origAdd.call(this, type, listener, options)
        } as any

        try {
            const el = document.createElement('my-slider-v2') as any
            el.setConfig(MISSING_ENTITY_CONFIG)
            el.hass = hassMissing()
            document.body.appendChild(el)
            await el.updateComplete
            await waitFrames(3)

            el.hass = hassPresent(100)
            await el.updateComplete
            await waitForSliderEl(el)

            const container = el.shadowRoot.querySelector('.my-slider-custom-container')

            // Many further hass updates, as would happen from ordinary state churn.
            for (const b of [110, 120, 130, 140, 150]) {
                el.hass = hassPresent(b)
                await el.updateComplete
            }

            const onContainer = captured.filter(c => c.target === container)
            expect(onContainer, 'touchmove attached exactly once on the container, never churned').toHaveLength(1)
        } finally {
            Element.prototype.addEventListener = origAdd
        }
    })

    it('5. control: entity present from the start behaves exactly as today', async () => {
        const el = document.createElement('my-slider-v2') as any
        el.setConfig({ entity: 'light.x' })
        el.hass = hassPresent()
        document.body.appendChild(el)
        await el.updateComplete
        await waitForSliderEl(el)

        expect(el.sliderEl, 'sliderEl acquired on first frame when entity is present').toBeTruthy()
        const container = el.shadowRoot.querySelector('.my-slider-custom-container') as HTMLElement
        layoutContainer(container)

        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 60, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 150, clientY: 5 }))
        await el.updateComplete
        await new Promise(r => setTimeout(r, 80))

        expect(el.hass.callService).toHaveBeenCalled()
    })
})
