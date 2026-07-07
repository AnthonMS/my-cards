import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #23: opt-in `showValue: true` renders a floating value label
// (.my-slider-custom-value) inside the container. It is hidden by default,
// shows the current slider value while the user is pressing/moving, and hides
// again when the interaction ends. With showValue unset/false the element is
// NOT rendered at all — the existing DOM contract is unchanged.
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

const waitForSliderEl = async (el: any) => {
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    expect(el.sliderEl, 'sliderEl set after first frame').toBeTruthy()
}

const valueElOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-value') as HTMLElement | null

afterEach(() => {
    document.body.innerHTML = ''
})

describe('showValue rendering (#23)', () => {
    it('default config: the value element is NOT rendered (DOM contract unchanged)', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        expect(valueElOf(el)).toBeNull()
    })

    it('showValue: false explicitly: not rendered either', async () => {
        const el = await mountSlider({ entity: 'light.a', showValue: false })
        expect(valueElOf(el)).toBeNull()
    })

    it('showValue: true renders the label inside the container, hidden by default', async () => {
        const el = await mountSlider({ entity: 'light.a', showValue: true })
        const valueEl = valueElOf(el)
        expect(valueEl).toBeTruthy()
        expect(valueEl!.parentElement!.classList.contains('my-slider-custom-container')).toBe(true)
        expect(valueEl!.style.display).toBe('none')
    })

    it('user styles.value overrides the defaults', async () => {
        const el = await mountSlider({
            entity: 'light.a',
            showValue: true,
            styles: { value: [{ 'font-size': '20px' }] },
        })
        expect(valueElOf(el)!.style.fontSize).toBe('20px')
    })
})

describe('showValue behavior while dragging (#23)', () => {
    it('shows and updates the value on drag actions, hides on mouseup', async () => {
        const el = await mountSlider({ entity: 'light.a', showValue: true })
        await waitForSliderEl(el)
        const valueEl = valueElOf(el)!

        // simulate an active drag (jsdom has no layout, so drive setProgress directly)
        el.actionTaken = true
        el.setProgress(el.sliderEl, 42, 'mousemove')
        expect(valueEl.style.display).toBe('block')
        expect(valueEl.textContent).toBe('42')

        el.setProgress(el.sliderEl, 57, 'touchmove')
        expect(valueEl.textContent).toBe('57')

        // ending the interaction hides the label (stopInput path)
        const container = el.shadowRoot.querySelector('.my-slider-custom-container')
        container.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 5, clientY: 5 }))
        expect(valueEl.style.display).toBe('none')
    })

    it('programmatic/polling progress updates never show the label', async () => {
        const el = await mountSlider({ entity: 'light.a', showValue: true })
        await waitForSliderEl(el)
        const valueEl = valueElOf(el)!

        el.actionTaken = false
        el.setProgress(el.sliderEl, 33, 'updateSeekbar')
        expect(valueEl.style.display).toBe('none')

        // even a drag-type action without actionTaken (pure hover movement) stays hidden
        el.setProgress(el.sliderEl, 33, 'mousemove')
        expect(valueEl.style.display).toBe('none')
    })

    it('label value respects step rounding and avoids float noise', async () => {
        const el = await mountSlider({ entity: 'light.a', showValue: true, step: 0.1 })
        await waitForSliderEl(el)
        el.actionTaken = true
        el.setProgress(el.sliderEl, 41.6789, 'mousemove')
        expect(valueElOf(el)!.textContent).toBe('41.7')
    })
})
