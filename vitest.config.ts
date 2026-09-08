import { defineConfig } from 'vitest/config'

// Test-only config. The production build (rollup, other/ops/*) is untouched by this file.
export default defineConfig({
    test: {
        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                // gives us requestAnimationFrame, which my-slider-v2's updated() relies on
                pretendToBeVisual: true,
            },
        },
        include: ['test/**/*.test.ts'],
    },
})
