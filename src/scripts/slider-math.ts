// ============================================================================
// Pure slider math extracted from my-slider-v2's initializeConfig() (Phase 2
// cleanup). These were copy-pasted into every entity branch; the formulas are
// UNCHANGED and pinned by the characterization tests in test/ plus the
// table-driven unit tests in test/slider-math.test.ts.
// ============================================================================

/**
 * Rescale a 0..100 slider value into the sliderMin..100 range, clamped at the
 * sliderMin floor. sliderMin is "the minimum percentage progress to always
 * show" (see docs/cards/slider-v2.md).
 */
export const applySliderMin = (val: number, sliderMin: number): number => {
    const rescaled = (val * (100 - sliderMin) / 100) + sliderMin
    return rescaled < sliderMin ? sliderMin : rescaled
}

/**
 * When showMin is false, the entity's minimum maps to the far-left of the
 * slider: shrink the range by min and shift the value down by min.
 * Callers keep their own guard conditions (some branches guard on
 * `!showMin && min`, the light color modes on `!showMin` alone) — those
 * differences are pre-existing pinned behavior.
 */
export const shiftForHiddenMin = (min: number, max: number, val: number): { max: number; val: number } => {
    return { max: max - min, val: val - min }
}
