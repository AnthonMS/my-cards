import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// F-12: startInput/moveInput read the pointer with
//   `event.clientX || event.touches[0].clientX`
// 0 is falsy, so a mouse press on the EXACT left edge (clientX 0) — or the exact
// top edge (clientY 0) on a vertical slider — fell through to `event.touches`,
// which does not exist on a MouseEvent, and threw:
//   TypeError: Cannot read properties of undefined (reading '0')
//
// Hit repeatedly while building the #75 test harness. The tests below drive the
// real listeners with 0 coordinates and assert the interaction completes.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const W = 200, H = 200

const mount = async (config: Record<string, any>, entity: FakeEntity) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    const hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService: vi.fn() }
    el.hass = hass
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    const c = el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement
    Object.defineProperty(c, 'offsetWidth', { value: W, configurable: true })
    Object.defineProperty(c, 'offsetHeight', { value: H, configurable: true })
    c.getBoundingClientRect = () => ({ left: 0, top: 0, right: W, bottom: H, width: W, height: H, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect
    return { el, container: c, hass }
}

const light: FakeEntity = { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } }
const inputNumber = (min: number, max: number, state: string): FakeEntity =>
    ({ entity_id: 'input_number.t', state, attributes: { min, max, step: 1 } })

// Surface async listener errors as test failures — the original bug threw from an
// event handler, which jsdom reports as an unhandled error rather than a rejection.
let caught: any[] = []
const onErr = (e: any) => { caught.push(e.error || e.reason); e.preventDefault?.() }
beforeEach(() => { caught = []; window.addEventListener('error', onErr) })
afterEach(() => {
    window.removeEventListener('error', onErr)
    document.body.innerHTML = ''
    vi.useRealTimers()
})

describe('F-12 zero coordinates at the slider edges', () => {
    it('mousedown at clientX 0 does not throw', async () => {
        const { container } = await mount({ entity: 'light.a' }, light)
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 5 }))
        expect(caught, 'no error thrown from the listener').toEqual([])
    })

    it('mousedown at clientX 0 still registers the tap and writes a value', async () => {
        const { el, container, hass } = await mount({ entity: 'input_number.t' }, inputNumber(0, 100, '50'))
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 0, clientY: 5 }))
        await el.updateComplete
        expect(caught).toEqual([])
        const calls = (hass.callService as any).mock.calls
        expect(calls.length, 'far-left tap produced a service call').toBeGreaterThan(0)
        expect(calls[calls.length - 1][2].value).toBe(0)
    })

    it('a full drag through x=0 does not throw', async () => {
        const { container } = await mount({ entity: 'light.a' }, light)
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 40, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 0, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 0, clientY: 5 }))
        expect(caught).toEqual([])
    })

    it('vertical slider: clientY 0 (top edge) does not throw', async () => {
        const { container } = await mount({ entity: 'light.a', vertical: true }, light)
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 5, clientY: 0 }))
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 5, clientY: 0 }))
        expect(caught).toEqual([])
    })

    it('cover (vertical + flipped defaults): clientY 0 does not throw', async () => {
        const cover: FakeEntity = { entity_id: 'cover.c', state: 'open', attributes: { current_position: 50 } }
        const { container } = await mount({ entity: 'cover.c', mode: 'position' }, cover)
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 5, clientY: 0 }))
        expect(caught).toEqual([])
    })

    it('allowTapping:false path also survives a 0 coordinate', async () => {
        // This path reads clickX/clickY for the thumb hit-test rather than tapping.
        const { container } = await mount({ entity: 'light.a', allowTapping: false }, light)
        container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 0 }))
        expect(caught).toEqual([])
    })

    it('touch input still works (the branch the || was there for)', async () => {
        const { el, container, hass } = await mount({ entity: 'input_number.t' }, inputNumber(0, 100, '50'))
        const touch = (x: number, y: number) => ({ clientX: x, clientY: y }) as any
        const tev = (type: string, x: number, y: number) => {
            const e: any = new Event(type, { bubbles: true })
            e.touches = [touch(x, y)]
            e.changedTouches = [touch(x, y)]
            return e
        }
        container.dispatchEvent(tev('touchstart', 150, 5))
        document.dispatchEvent(tev('touchend', 150, 5))
        await el.updateComplete
        expect(caught).toEqual([])
        expect((hass.callService as any).mock.calls.length).toBeGreaterThan(0)
    })
})
