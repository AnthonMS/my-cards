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

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation and filtering.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects: any): any {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    return objects.reduce((prev: any, obj: any) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                /* eslint no-param-reassign: 0 */
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
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
