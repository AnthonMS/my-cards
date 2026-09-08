// Historical location of the untyped deflate() implementation (plus a large
// commented-out Object.prototype experiment). Unified in the Phase 2 cleanup:
// the typed implementation in helpers.ts is the single source of truth
// (behavioral parity between the two was proven by test/deflate.test.ts before
// unification). This file remains only so the frozen my-button and old
// my-slider import paths keep working unchanged.
export { deflate } from './helpers';
