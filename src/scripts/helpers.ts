export const percentage = (val, max = 100, min = 0) => {
    return val / (max - min) * 100
}

export const roundPercentage = (val) => {
    return Math.round((val + Number.EPSILON) * 100) / 100
}

    
export const getClickPosRelToTarget = (event, slider) => { 
    // Get click position on touch inputs or mouse inputs
    let cords = {x:0, y:0}
    if(event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend' || event.type == 'touchcancel'){
        let evt = (typeof event.originalEvent === 'undefined') ? event : event.originalEvent
        let touch = evt.touches[0] || evt.changedTouches[0]
        cords.x = touch.clientX
        cords.y = touch.clientY
    } else if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove' || event.type == 'mouseover'|| event.type=='mouseout' || event.type=='mouseenter' || event.type=='mouseleave') {
        cords.x = event.clientX
        cords.y = event.clientY
    }
    let rect = slider.getBoundingClientRect()
    let x = cords.x - rect.left //x position within the element.
    let y = cords.y - rect.top  //y position within the element.
    y = slider.offsetHeight - y // y click position relative to bottom
    return { x, y }
}

export const objectToStyleString = (object) => {
    if (!object) return ''
    let str = ''
    const attributeKeys = Object.keys(object)
    attributeKeys.map((key) => {
        const value = object[key]
        str += camelToKebab(key) + ':' + value + ';'
    })

    return str
}


export const camelToKebab = str => {
    return str.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter && letter !== '-'
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
}


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
export function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function arrayToObject(styleArray: any[]) {
    return styleArray.reduce((styleObject, style) => {
        const [key, value] = Object.entries(style)[0];
        styleObject[key] = value;
        return styleObject;
    }, {});
}

export function objectToArray(styleObject: any) {
    return Object.entries(styleObject).map(([key, value]) => ({ [key]: value }));
}
