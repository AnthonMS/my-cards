import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// F-10: moveInput/stopInput dereferenced `this.sliderEl!` directly, but
// sliderEl is only grabbed inside a requestAnimationFrame callback after the
// first render (see updated()). A drag that begins BEFORE that first frame
// (mousedown -> mousemove -> mouseup) therefore threw an uncaught TypeError.
// calcProgress already guarded against this; moveInput/stopInput now do too.
//
// These tests simulate the pre-first-frame state deterministically by forcing
// sliderEl back to undefined after mount, then replaying the drag sequence.
// jsdom reports exceptions thrown inside event listeners as window `error`
// events, so we capture those to assert "no uncaught TypeError".
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const mountSlider = async (config: Record<string, any>) => {
    const entity: FakeEntity = { entity_id: 'light.a', state: 'on', attributes: { brightness: 128 } }
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { 'light.a': entity }, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    return el
}

const mouse = (type: string, x = 5, y = 5) =>
    new MouseEvent(type, { bubbles: true, clientX: x, clientY: y })

const withErrorCapture = async (fn: () => void | Promise<void>) => {
    const errors: any[] = []
    const onErr = (e: any) => { errors.push(e?.error ?? e); e.preventDefault?.() }
    window.addEventListener('error', onErr)
    try { await fn() } finally { window.removeEventListener('error', onErr) }
    return errors
}

afterEach(() => {
    document.body.innerHTML = ''
})

describe('drag before the first post-render frame (F-10)', () => {
    it('mousedown -> mousemove -> mouseup with sliderEl unset does not throw', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        el.sliderEl = undefined // simulate: first rAF has not run yet

        const errors = await withErrorCapture(() => {
            container.dispatchEvent(mouse('mousedown'))
            container.dispatchEvent(mouse('mousemove', 25))
            container.dispatchEvent(mouse('mouseup', 25))
        })
        expect(errors, `uncaught listener errors: ${errors.map(String).join(', ')}`).toHaveLength(0)
    })

    it('stopInput still clears the input flags when sliderEl is unset', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        el.sliderEl = undefined

        await withErrorCapture(() => {
            container.dispatchEvent(mouse('mousedown'))
            container.dispatchEvent(mouse('mouseup'))
        })
        expect(el.touchInput).toBe(false)
        expect(el.thumbTapped).toBe(false)
        expect(el.isSliding).toBe(false)
        // actionTaken resets on a 50ms timer inside stopInput
        await new Promise(r => setTimeout(r, 80))
        expect(el.actionTaken).toBe(false)
    })

    it('normal drag path (sliderEl present) is unaffected', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        // wait for the first frame so sliderEl is set, as the card does in real life
        for (let i = 0; i < 50 && !el.sliderEl; i++) {
            await new Promise<void>(r => requestAnimationFrame(() => r()))
        }
        expect(el.sliderEl, 'sliderEl set after first frame').toBeTruthy()
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')

        const errors = await withErrorCapture(() => {
            container.dispatchEvent(mouse('mousedown'))
        })
        expect(errors).toHaveLength(0)
        expect(el.actionTaken).toBe(true) // allowTapping default: mousedown takes action
    })
})
