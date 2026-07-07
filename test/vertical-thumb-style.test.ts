import { describe, it, expect, afterEach, vi } from 'vitest'
import '../src/cards/my-slider'

// ============================================================================
// F-2: on VERTICAL sliders, the code assigned the whole deflated thumb style
// object to thumbStl.right instead of its `.right` value:
//     thumbStl.right = deflatedThumbStl.right ? deflatedThumbStl : 'auto'
// so a user-supplied styles.thumb `right` was silently dropped (styleMap got
// an object, which is not a valid CSS value). Fixed to use `.right`.
// The default (no user thumb styles) and horizontal paths are pinned unchanged.
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

const thumbOf = (el: any) => el.shadowRoot!.querySelector('.my-slider-custom-thumb') as HTMLElement

afterEach(() => {
    document.body.innerHTML = ''
})

describe('vertical thumb `right` style (F-2)', () => {
    it('user styles.thumb right is applied on a vertical slider (was dropped before the fix)', async () => {
        const el = await mountSlider({
            entity: 'light.a',
            vertical: true,
            styles: { thumb: [{ right: '2px' }] },
        })
        expect(thumbOf(el).style.right).toBe('2px')
    })

    it('vertical slider without user thumb styles keeps the default right: auto', async () => {
        const el = await mountSlider({ entity: 'light.a', vertical: true })
        expect(thumbOf(el).style.right).toBe('auto')
    })

    it('horizontal slider keeps the default right: -5px (untouched path)', async () => {
        const el = await mountSlider({ entity: 'light.a' })
        expect(thumbOf(el).style.right).toBe('-5px')
    })

    it('horizontal slider still honors user styles.thumb right (untouched path)', async () => {
        const el = await mountSlider({
            entity: 'light.a',
            flipped: true,
            styles: { thumb: [{ right: '3px' }] },
        })
        expect(thumbOf(el).style.right).toBe('3px')
    })
})
