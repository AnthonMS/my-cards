import { describe, it, expect, vi } from 'vitest'
import { existsSync } from 'fs'
import { resolve } from 'path'

// ============================================================================
// BUILD-ARTIFACT SMOKE TEST: loads the actual dist/my-slider-v2.js bundle
// (what HACS ships) and asserts the custom element registers and renders the
// contractual DOM. This guards the whole rollup/typescript pipeline — a build
// that produces a broken bundle fails here even when the src-level tests pass.
// Run `npm run build` first; the test skips (with a warning) if dist is absent.
// ============================================================================

const bundle = resolve(__dirname, '../dist/my-slider-v2.js')

describe.skipIf(!existsSync(bundle))('dist bundle smoke (my-slider-v2.js)', () => {
    it('bundle registers <my-slider-v2> and renders the DOM contract', async () => {
        await import(bundle)
        const ctor = customElements.get('my-slider-v2')
        expect(ctor, 'custom element registered by the bundle').toBeTruthy()

        const el = document.createElement('my-slider-v2') as any
        el.setConfig({ entity: 'light.smoke' })
        el.hass = {
            states: { 'light.smoke': { entity_id: 'light.smoke', state: 'on', attributes: { brightness: 128 } } },
            user: { name: 'tester' },
            callService: vi.fn(),
        }
        document.body.appendChild(el)
        await el.updateComplete

        const root = el.shadowRoot!
        expect(root.querySelector('ha-card.my-slider-custom-card'), 'card').toBeTruthy()
        const container = root.querySelector('.my-slider-custom-container') as HTMLElement
        expect(container, 'container').toBeTruthy()
        expect(container.getAttribute('data-value')).toBe('50')
        expect(root.querySelector('.my-slider-custom-track'), 'track').toBeTruthy()
        expect(root.querySelector('.my-slider-custom-progress'), 'progress').toBeTruthy()
        expect(root.querySelector('.my-slider-custom-thumb'), 'thumb').toBeTruthy()
        document.body.innerHTML = ''
    })
})
