import { HassEntity, HassEntityAttributeBase, HassEntityBase } from 'home-assistant-js-websocket';
import { OFF, UNAVAILABLE, isUnavailableState } from '../cards/extras/const';

/**
 * Calculates the percentage of a value within a range.
 *
 * @param {number} val - The value to calculate the percentage for
 * @param {number} [max=100] - The maximum value of the range
 * @param {number} [min=0] - The minimum value of the range
 * @returns {number} The percentage of the value within the range
 */
export const percentage = (val, max = 100, min = 0) => {
    return val / (max - min) * 100
}

/**
 * Rounds a value to the nearest hundredth.
 *
 * @param {number} val - The value to round
 * @returns {number} The rounded value
 */
export const roundPercentage = (val) => {
    return Math.round((val + Number.EPSILON) * 100) / 100
}



/**
 * Gets the position of a click event relative to a target element.
 *
 * @param {Event} event - The click event
 * @param {HTMLElement} element - The target element
 * @returns {object} An object with the x and y coordinates of the click relative to the target element
 */
export const getClickPosRelToTarget = (event, element) => {
    // Get click position on touch inputs or mouse inputs
    let cords = { x: 0, y: 0 }
    if (event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend' || event.type == 'touchcancel') {
        let evt = (typeof event.originalEvent === 'undefined') ? event : event.originalEvent
        let touch = evt.touches[0] || evt.changedTouches[0]
        cords.x = touch.clientX
        cords.y = touch.clientY
    } else if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove' || event.type == 'mouseover' || event.type == 'mouseout' || event.type == 'mouseenter' || event.type == 'mouseleave') {
        cords.x = event.clientX
        cords.y = event.clientY
    }
    let rect = element.getBoundingClientRect()
    let x = cords.x - rect.left //x position within the element.
    let y = cords.y - rect.top  //y position within the element.
    y = element.offsetHeight - y // y click position relative to bottom
    return { x, y }
}




/**
 * Converts a style object into a CSS style string.
 *
 * @param {object} object - The style object to convert
 * @returns {string} A CSS style string
 */
export const myStyleMap = (object) => {
    if (!object) return ''
    let str = ''
    const attributeKeys = Object.keys(object)
    attributeKeys.map((key) => {
        const value = object[key]
        str += camelToKebab(key) + ':' + value + ';'
    })

    return str
}



/**
 * Converts a camelCase string into a kebab-case string.
 *
 * @param {string} str - The camelCase string to convert
 * @returns {string} The kebab-case string
 */
export const camelToKebab = str => {
    return str.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter && letter !== '-'
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
}



/**
 * Performs a deep merge of two objects, returning a new object that includes properties from both source and target.
 * If a property exists in both objects, the value from the source object will be used.
 * If a property is an array, it will be merged by index.
 * If a property is an object, it will be recursively merged.
 * Non-object values will be overwritten by the values from the source object.
 *
 * @param {any} target - The target object to merge into
 * @param {any} source - The source object to merge from
 * @returns {any} A new object that is the result of deeply merging target and source
 */
export function deepMerge(target: any, source: any) {
    if (!isObject(target)) return isObject(source) ? source : {}
    if (!isObject(source)) return isObject(target) ? target : {}


    if (isObject(target) && isObject(source)) {
        const output = Object.assign({}, target);
        Object.keys(source).forEach(key => {
            if (Array.isArray(source[key])) {
                output[key] = source[key].map((item, index) => {
                    if (target[key] && isObject(target[key][index]) && isObject(item)) {
                        return deepMerge(target[key][index], item);
                    } else {
                        return item;
                    }
                });
            } else if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = deepMerge(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
        return output;
    }
    return {}
}



/**
 * Checks if the provided item is an object and not an array.
 *
 * @param {any} item - The item to check
 * @returns {boolean} True if the item is an object and not an array, false otherwise
 */
export function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}


/**
 * Converts an array of objects into a single object.
 * Each object in the array should have a single key-value pair.
 *
 * @param {any[]} array - The array of objects to convert
 * @returns {object} A single object that combines all the objects in the array
 */
export function arrayToObject(array: any[]) {
    return array.reduce((obj, entry) => {
        const [key, value] = Object.entries(entry)[0];
        obj[key] = value;
        return obj;
    }, {});
}


/**
 * Converts an object into an array of objects.
 * Each object in the array will have a single key-value pair from the original object.
 *
 * @param {any} object - The object to convert
 * @returns {object[]} An array of style objects, each with a single key-value pair from the original style object
 */
export function objectToArray(object: any) {
    return Object.entries(object).map(([key, value]) => ({ [key]: value }));
}


/**
 * Deflates an object by flattening its structure, turning nested objects into single-level objects.
 * The keys of the resulting object are the original keys of the nested objects.
 * Each nested object cannot hold the same keys, as they will overwrite each other.
 * Each object will always only have 1 key.
 *
 * @param {Record<string, any>} source - The object to deflate
 * @param {string[]} [pathArray=[]] - An array to keep track of the object's current path
 * @param {Record<string, any>} [result={}] - The resulting deflated object
 * @returns {Record<string, any>} The deflated object
 */
export const deflate = function (source: Record<string, any>, pathArray: string[] = [], result: Record<string, any> = {}): Record<string, any> {
    let key: string, value: any, newKey: string;

    for (let i in source) {
        if (source.hasOwnProperty(i)) {

            key = i;
            value = source[i];

            pathArray.push(key);

            if (typeof value === 'object' && value !== null) {

                result = deflate(value, pathArray, result);

            } else {
                //newKey = pathArray.join('.'); // Use this for useful application
                newKey = pathArray[pathArray.length - 1] // I use this because I just want the original keyname. This way each nested object cannot hold the same keys, as they will overwrite eachother. I use this in a way each object will always only have 1 key
                result[newKey] = value;
            }

            pathArray.pop();
        }
    }

    return result;
};




export function computeDomain(entityId: string): string {
    return entityId.substring(0, entityId.indexOf('.'));
}

export function computeEntity(entityId: string): string {
    return entityId.substring(entityId.indexOf('.') + 1);
}

export const computeStateDomain = (stateObj: HassEntity) => computeDomain(stateObj.entity_id);

interface GroupEntityAttributes extends HassEntityAttributeBase {
    entity_id: string[];
    order: number;
    auto?: boolean;
    view?: boolean;
    control?: 'hidden';
}
export interface GroupEntity extends HassEntityBase {
    attributes: GroupEntityAttributes;
}
export const computeGroupDomain = (stateObj: GroupEntity): string | undefined => {
    const entityIds = stateObj.attributes.entity_id || [];
    const uniqueDomains = [...new Set(entityIds.map((entityId) => computeDomain(entityId)))];
    return uniqueDomains.length === 1 ? uniqueDomains[0] : undefined;
};

export function stateActive(stateObj: HassEntity | undefined, state?: string): boolean {
    if (stateObj === undefined) {
        return false;
    }
    const domain = computeDomain(stateObj.entity_id);
    const compareState = state !== undefined ? state : stateObj?.state;

    if (['button', 'event', 'input_button', 'scene'].includes(domain)) {
        return compareState !== UNAVAILABLE;
    }

    if (isUnavailableState(compareState)) {
        return false;
    }

    // The "off" check is relevant for most domains, but there are exceptions
    // such as "alert" where "off" is still a somewhat active state.
    // "idle" is instead the state that matches what most other domains consider inactive.
    if (compareState === OFF && domain !== 'alert') {
        return false;
    }

    // Custom cases
    switch (domain) {
        case 'alarm_control_panel':
            return compareState !== 'disarmed';
        case 'alert':
            // "on" and "off" are active, as "off" just means alert was acknowledged but is still active
            return compareState !== 'idle';
        case 'cover':
            return compareState !== 'closed';
        case 'device_tracker':
        case 'person':
            return compareState !== 'not_home';
        case 'lock':
            return compareState !== 'locked';
        case 'media_player':
            return compareState !== 'standby';
        case 'vacuum':
            return !['idle', 'docked', 'paused'].includes(compareState);
        case 'plant':
            return compareState === 'problem';
        case 'group':
            return ['on', 'home', 'open', 'locked', 'problem'].includes(compareState);
        case 'timer':
            return compareState === 'active';
        case 'camera':
            return compareState === 'streaming';
    }

    return true;
}


// From https://github.com/epoberezkin/fast-deep-equal
// MIT License - Copyright (c) 2017 Evgeny Poberezkin
export const deepEqual = (a: any, b: any): boolean => {
    if (a === b) {
        return true;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (a.constructor !== b.constructor) {
            return false;
        }

        let i: number | [any, any];
        let length: number;
        if (Array.isArray(a)) {
            length = a.length;
            if (length !== b.length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (!deepEqual(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }

        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) {
                return false;
            }
            for (i of a.entries()) {
                if (!b.has(i[0])) {
                    return false;
                }
            }
            for (i of a.entries()) {
                if (!deepEqual(i[1], b.get(i[0]))) {
                    return false;
                }
            }
            return true;
        }

        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) {
                return false;
            }
            for (i of a.entries()) {
                if (!b.has(i[0])) {
                    return false;
                }
            }
            return true;
        }

        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            // eslint-disable-next-line
            // @ts-ignore
            length = a.length;
            // eslint-disable-next-line
            // @ts-ignore
            if (length !== b.length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }

        if (a.constructor === RegExp) {
            return a.source === b.source && a.flags === b.flags;
        }
        if (a.valueOf !== Object.prototype.valueOf) {
            return a.valueOf() === b.valueOf();
        }
        if (a.toString !== Object.prototype.toString) {
            return a.toString() === b.toString();
        }

        const keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }
        for (i = length; i-- !== 0;) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }

        for (i = length; i-- !== 0;) {
            const key = keys[i];

            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }

    // true if both NaN, false otherwise
    // eslint-disable-next-line no-self-compare
    return a !== a && b !== b;
};


/**
 * Converts mireds to Kelvin (rounded). The two scales are reciprocal:
 * K = 1,000,000 / mireds.
 *
 * @param {number} mireds - Color temperature in mireds
 * @returns {number} Color temperature in Kelvin
 */
export const miredsToKelvin = (mireds: number): number => Math.round(1000000 / mireds)

/**
 * Converts Kelvin to mireds (rounded): mireds = 1,000,000 / K.
 * Note the scales are inverted: MIN kelvin corresponds to MAX mireds and vice versa.
 *
 * @param {number} kelvin - Color temperature in Kelvin
 * @returns {number} Color temperature in mireds
 */
export const kelvinToMireds = (kelvin: number): number => Math.round(1000000 / kelvin)

/**
 * Approximate an sRGB colour for a colour temperature in Kelvin, using Tanner
 * Helland's well-known approximation. Used by colorFromEntity (#28) as the
 * fallback when a light exposes color_temp_kelvin but no rgb_color. Channels are
 * clamped to 0..255 and rounded. This is an approximation, not colour-accurate.
 *
 * @param {number} kelvin - colour temperature in Kelvin (typ. 2000..6500)
 * @returns {{ r: number; g: number; b: number }} rounded 0..255 channels
 */
export const kelvinToRgb = (kelvin: number): { r: number; g: number; b: number } => {
    const clamp = (v: number) => v < 0 ? 0 : v > 255 ? 255 : Math.round(v)
    const temp = kelvin / 100
    let r: number, g: number, b: number
    // red
    if (temp <= 66) r = 255
    else r = 329.698727446 * Math.pow(temp - 60, -0.1332047592)
    // green
    if (temp <= 66) g = 99.4708025861 * Math.log(temp) - 161.1195681661
    else g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492)
    // blue
    if (temp >= 66) b = 255
    else if (temp <= 19) b = 0
    else b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307
    return { r: clamp(r), g: clamp(g), b: clamp(b) }
}

// ============================================================================
// #20 / #28 color-picker track helpers. Pure functions so they can be unit
// tested; the card wires them into render()/setProgress() when colorTrack is on
// (or mode: rgb). "value" is on the mode's own scale: a hue in degrees for
// rgb/hue, 0..100 for saturation, mireds for temperature.
// ============================================================================

export type ColorTrackMode = 'rgb' | 'hue' | 'saturation' | 'temperature'

/**
 * CSS colour for a single value on a colour-mode scale.
 * - rgb / hue: `value` is a hue in degrees -> hsl(H,100%,50%).
 * - saturation: `value` is 0..100, `hue` is the light's current hue.
 * - temperature: `value` is mireds -> kelvin -> kelvinToRgb.
 */
export const colorForValue = (mode: ColorTrackMode, value: number, hue = 0): string => {
    if (mode === 'temperature') {
        const kelvin = value > 0 ? 1000000 / value : 6500
        const { r, g, b } = kelvinToRgb(kelvin)
        return `rgb(${r}, ${g}, ${b})`
    }
    if (mode === 'saturation') {
        const s = value < 0 ? 0 : value > 100 ? 100 : value
        return `hsl(${hue}, ${s}%, ${100 - s / 2}%)`
    }
    return `hsl(${value}, 100%, 50%)`
}

/**
 * CSS gradient direction for the track, matching how the value maps to the axis.
 * horizontal -> to right (flipped: to left); vertical -> to top (flipped: to
 * bottom); `inverse` reverses the value mapping so it reverses the direction once
 * more. Gradient stops are always emitted realMin (0%) -> realMax (100%).
 */
export const colorTrackDirection = (vertical: boolean, flipped: boolean, inverse: boolean): string => {
    let dir = vertical ? (flipped ? 'to bottom' : 'to top') : (flipped ? 'to left' : 'to right')
    if (inverse) {
        const rev: Record<string, string> = {
            'to right': 'to left', 'to left': 'to right',
            'to top': 'to bottom', 'to bottom': 'to top',
        }
        dir = rev[dir]
    }
    return dir
}

/**
 * The full `linear-gradient(...)` for a colour-track. Samples colorForValue()
 * across [realMin, realMax] (7 stops for hue/rgb, 5 for temperature, 2 for
 * saturation) and lays them out realMin -> realMax; `direction` orients it.
 */
export const colorTrackGradient = (
    mode: ColorTrackMode, realMin: number, realMax: number, hue: number, direction: string,
): string => {
    const stops = mode === 'saturation' ? 2 : mode === 'temperature' ? 5 : 7
    const parts: string[] = []
    for (let i = 0; i < stops; i++) {
        const f = i / (stops - 1)
        const value = realMin + f * (realMax - realMin)
        parts.push(`${colorForValue(mode, value, hue)} ${Math.round(f * 100)}%`)
    }
    return `linear-gradient(${direction}, ${parts.join(', ')})`
}
