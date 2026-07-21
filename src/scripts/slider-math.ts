import { percentage } from './helpers'

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

/**
 * The slice of MySliderConfig sliderValueToEntity needs. Fields are optional to
 * match MySliderConfig (the card's config interface marks everything optional),
 * but initializeConfig() always populates them before any conversion runs.
 */
export interface SliderValueConfig {
    showMin?: boolean
    min?: number
    max?: number
    sliderMin?: number
    inverse?: boolean
}

/**
 * Convert a slider-space value (post shiftForHiddenMin / applySliderMin, already
 * stepped) into the real entity value that gets written to Home Assistant.
 *
 * Verbatim extraction of the value math that used to live inline in
 * my-slider-v2's setValue(): `+min` (when showMin is false) -> sliderMin
 * rescale -> clamp to min -> inverse mirror, IN THAT ORDER. The order is pinned
 * behavior, not tidiness — do not reorder.
 *
 * Exists so the showValue drag label and the service call cannot disagree: both
 * now go through this one function. (F-11)
 */
export const sliderValueToEntity = (
    val: number,
    cfg: SliderValueConfig
): number => {
    if (!cfg.showMin) {
        val = val + cfg.min  // Adding min to make up for minimum not being 0
    }
    // Adjust val to take into account sliderMin
    val = percentage(val - cfg.sliderMin, 100 - cfg.sliderMin)
    val = val < cfg.min ? cfg.min : val
    if (cfg.inverse) {
        // Mirror the value within the entity's REAL range. When showMin is false,
        // min was just added back to val and max was shrunk by min, so the real range
        // is [min, max + min]; with showMin true it is [min, max]. For min = 0 (the
        // common case: brightness, volume, cover position) both formulas reduce to the
        // previous `max - val`, so those domains are unchanged. Previously, domains
        // with min > 0 (e.g. temperature in mireds) produced out-of-range values. (#63)
        if (!cfg.showMin) {
            val = 2 * cfg.min + cfg.max - val
        }
        else {
            val = cfg.min + cfg.max - val
        }
    }
    return val
}
