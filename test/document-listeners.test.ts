import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Regression test for the document-listener accumulation fixed in the Phase 2
// cleanup: handlers used to be closures recreated in every render() and
// re-added to document each time (removeEventListener with a new closure is a
// no-op), so listeners piled up for the element's lifetime and were never
// removed on disconnect. Now: stable instance handler, added once in
// connectedCallback, removed in disconnectedCallback.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

let net: Record<string, number>
const origAdd = document.addEventListener.bind(document)
const origRemove = document.removeEventListener.bind(document)

beforeEach(() => {
    net = {}
    document.addEventListener = ((type: any, l: any, o: any) => {
        net[type] = (net[type] ?? 0) + 1
        return origAdd(type, l, o)
    }) as any
    document.removeEventListener = ((type: any, l: any, o: any) => {
        net[type] = (net[type] ?? 0) - 1
        return origRemove(type, l, o)
    }) as any
})

afterEach(() => {
    document.addEventListener = origAdd as any
    document.removeEventListener = origRemove as any
    document.body.innerHTML = ''
})

const hassFor = (brightness: number) => ({
    states: { 'light.a': { entity_id: 'light.a', state: 'on', attributes: { brightness } } as FakeEntity },
    user: { name: 'tester' },
    callService: vi.fn(),
})

describe('document listener lifecycle', () => {
    it('re-renders do not accumulate document listeners (was +4 per render)', async () => {
        const el = document.createElement('my-slider-v2') as any
        el.setConfig({ entity: 'light.a' })
        el.hass = hassFor(100)
        document.body.appendChild(el)
        await el.updateComplete

        const afterFirstRender = { ...net }
        // trigger several re-renders via entity updates
        for (const b of [110, 120, 130, 140, 150]) {
            el.hass = hassFor(b)
            await el.updateComplete
        }
        expect(net.mousemove, 'net mousemove listeners stable across renders').toBe(afterFirstRender.mousemove)
        expect(net.mouseup, 'net mouseup listeners stable across renders').toBe(afterFirstRender.mouseup)
        expect(net.mousemove).toBe(1)

        // disconnect removes everything the element added on document
        el.remove()
        expect(net.mousemove, 'mousemove removed on disconnect').toBe(0)
        expect(net.mouseup, 'mouseup removed on disconnect').toBe(0)
        expect(net.touchend, 'touchend removed on disconnect').toBe(0)
        expect(net.touchcancel, 'touchcancel removed on disconnect').toBe(0)
    })

    it('drag handling still works through the stable handler', async () => {
        const el = document.createElement('my-slider-v2') as any
        el.setConfig({ entity: 'light.a' })
        el.hass = hassFor(128)
        document.body.appendChild(el)
        await el.updateComplete
        for (let i = 0; i < 50 && !el.sliderEl; i++) {
            await new Promise<void>(r => requestAnimationFrame(() => r()))
        }
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 5, clientY: 5 }))
        expect(el.actionTaken).toBe(true) // startInput reached via instance handler
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 5, clientY: 5 }))
        await new Promise(r => setTimeout(r, 80))
        expect(el.actionTaken).toBe(false) // stopInput reached via document listener
    })
})
