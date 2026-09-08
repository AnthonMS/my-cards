import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// Issue #5 (+ "text inside slider"): opt-in `label:` renders text INSIDE the
// slider container.
//   label: true          -> entity friendly_name (fallback: entity_id tail)
//   label: "Front Spots"  -> that text
//   label: "[[[ ... ]]]"  -> templated, re-evaluated on every hass update
//   absent / false        -> NO element (DOM contract unchanged)
//
// The templated form is how the original ask ("show the VALUE on the slider")
// is satisfied: label: '[[[ return entity.state + " %" ]]]'.
// ============================================================================

type FakeEntity = { entity_id: string; state: string; attributes: Record<string, any> }

const mount = async (config: Record<string, any>, entity: FakeEntity) => {
    const el = document.createElement('my-slider-v2') as any
    el.setConfig(config)
    el.hass = { states: { [entity.entity_id]: entity }, user: { name: 'tester' }, callService: vi.fn() }
    document.body.appendChild(el)
    await el.updateComplete
    for (let i = 0; i < 50 && !el.sliderEl; i++) {
        await new Promise<void>(r => requestAnimationFrame(() => r()))
    }
    return el
}

const labelOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-label') as HTMLElement | null
const containerOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-container') as HTMLElement

const light = (attrs: Record<string, any> = {}): FakeEntity =>
    ({ entity_id: 'light.front_door', state: 'on', attributes: { brightness: 128, ...attrs } })
const num = (state: string, attrs: Record<string, any> = {}): FakeEntity =>
    ({ entity_id: 'input_number.temp', state, attributes: { min: 0, max: 100, step: 1, ...attrs } })

afterEach(() => { document.body.innerHTML = '' })

describe('#5 DOM contract', () => {
    it('no label key: no label element', async () => {
        const el = await mount({ entity: 'light.front_door' }, light())
        expect(labelOf(el)).toBeNull()
    })

    it('label: false: no label element', async () => {
        const el = await mount({ entity: 'light.front_door', label: false }, light())
        expect(labelOf(el)).toBeNull()
    })

    it('label element lives inside the container', async () => {
        const el = await mount({ entity: 'light.front_door', label: 'Hi' }, light())
        const lbl = labelOf(el)
        expect(lbl).toBeTruthy()
        expect(lbl!.parentElement!.classList.contains('my-slider-custom-container')).toBe(true)
    })

    it('data-value / data-progress-percent and the class hierarchy are untouched by a label', async () => {
        const el = await mount({ entity: 'light.front_door', label: 'Hi' }, light())
        const c = containerOf(el)
        expect(c.getAttribute('data-value')).toBeTruthy()
        expect(c.getAttribute('data-progress-percent')).toBeTruthy()
        expect(el.shadowRoot!.querySelector('.my-slider-custom-thumb')).toBeTruthy()
    })
})

describe('#5 label content', () => {
    it('label: true -> friendly_name', async () => {
        const el = await mount({ entity: 'light.front_door', label: true }, light({ friendly_name: 'Front Door Spots' }))
        expect(labelOf(el)!.textContent).toBe('Front Door Spots')
    })

    it('label: true without friendly_name -> entity_id tail, never "undefined"', async () => {
        const el = await mount({ entity: 'light.front_door', label: true }, light())
        expect(labelOf(el)!.textContent).toBe('front_door')
        expect(labelOf(el)!.textContent).not.toContain('undefined')
    })

    it('label: "custom string" -> that text', async () => {
        const el = await mount({ entity: 'light.front_door', label: 'Kitchen' }, light())
        expect(labelOf(el)!.textContent).toBe('Kitchen')
    })

    it('templated label -> evaluated value (the "value on the slider" use case)', async () => {
        const el = await mount({ entity: 'input_number.temp', label: '[[[ return entity.state + " %" ]]]' }, num('50'))
        expect(labelOf(el)!.textContent).toBe('50 %')
    })

    it('templated label updates on the next hass update', async () => {
        const el = await mount({ entity: 'input_number.temp', label: '[[[ return entity.state + " %" ]]]' }, num('50'))
        expect(labelOf(el)!.textContent).toBe('50 %')
        el.hass = { states: { 'input_number.temp': num('75') }, user: { name: 'tester' }, callService: vi.fn() }
        await el.updateComplete
        expect(labelOf(el)!.textContent).toBe('75 %')
    })

    it('a template returning a number is coerced to text', async () => {
        const el = await mount({ entity: 'input_number.temp', label: '[[[ return 42 ]]]' }, num('50'))
        expect(labelOf(el)!.textContent).toBe('42')
    })
})

describe('#5 styling and interaction', () => {
    it('default label does not intercept pointer input', async () => {
        const el = await mount({ entity: 'light.front_door', label: 'Hi' }, light())
        expect(labelOf(el)!.style.pointerEvents).toBe('none')
    })

    it('a tap still sets the value with a label present (label is not in the way)', async () => {
        const entity = num('50')
        const el = await mount({ entity: 'input_number.temp', label: 'Temp' }, entity)
        const c = containerOf(el)
        Object.defineProperty(c, 'offsetWidth', { value: 200, configurable: true })
        Object.defineProperty(c, 'offsetHeight', { value: 50, configurable: true })
        c.getBoundingClientRect = () => ({ left: 0, top: 0, right: 200, bottom: 50, width: 200, height: 50, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect
        c.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 150, clientY: 5 }))
        document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 150, clientY: 5 }))
        await el.updateComplete
        expect((el.hass.callService as any).mock.calls.length).toBeGreaterThan(0)
    })

    it('styles.label overrides the defaults', async () => {
        const el = await mount({
            entity: 'light.front_door',
            label: 'Hi',
            styles: { label: [{ color: 'red' }, { 'font-size': '20px' }] },
        }, light())
        const lbl = labelOf(el)!
        expect(lbl.style.color).toBe('red')
        expect(lbl.style.fontSize).toBe('20px')
    })

    it('coexists with showValue: both elements render, independently', async () => {
        const el = await mount({ entity: 'light.front_door', label: 'Hi', showValue: true }, light())
        expect(labelOf(el)).toBeTruthy()
        expect(el.shadowRoot!.querySelector('.my-slider-custom-value')).toBeTruthy()
    })

    it('coexists with markers', async () => {
        const el = await mount({ entity: 'input_number.temp', label: 'Temp', markers: [{ value: 50 }] }, num('50'))
        expect(labelOf(el)).toBeTruthy()
        expect(el.shadowRoot!.querySelectorAll('.my-slider-custom-marker').length).toBe(1)
    })
})
