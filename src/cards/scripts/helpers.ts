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
        var evt = (typeof event.originalEvent === 'undefined') ? event : event.originalEvent
        var touch = evt.touches[0] || evt.changedTouches[0]
        cords.x = touch.pageX
        cords.y = touch.pageY
    } else if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove' || event.type == 'mouseover'|| event.type=='mouseout' || event.type=='mouseenter' || event.type=='mouseleave') {
        cords.x = event.clientX
        cords.y = event.clientY
    }
    var rect = slider.getBoundingClientRect();
    var x = cords.x - rect.left; //x position within the element.
    var y = cords.y - rect.top;  //y position within the element.
    return { x, y }
}