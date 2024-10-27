export const CARD_VERSION = '2.0.4'
export const SLIDER_VERSION = '3.0.7'
export const BUTTON_VERSION = '1.0.2'




export const UNAVAILABLE = 'unavailable';
export const BINARY_STATE_ON = 'on';
export const BINARY_STATE_OFF = 'off';
const arrayLiteralIncludes =
  <T extends readonly unknown[]>(array: T) =>
  (searchElement: unknown, fromIndex?: number): searchElement is T[number] =>
    array.includes(searchElement as T[number], fromIndex);

export const UNKNOWN = 'unknown';
export const ON = 'on';
export const OFF = 'off';

export const UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN] as const;
export const OFF_STATES = [UNAVAILABLE, UNKNOWN, OFF] as const;

export const isUnavailableState = arrayLiteralIncludes(UNAVAILABLE_STATES);
export const isOffState = arrayLiteralIncludes(OFF_STATES);