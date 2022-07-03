export const percentage = (val, max = 100, min = 0) => {
    // console.log('Finding percentage of value:', val)
    // console.log('Min:', min)
    // console.log('Max:', max)
    // console.log('Test:', (max-min))
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
