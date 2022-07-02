export const getStyle = (e:string, style:any = {}) => {
    switch (e) {
        case 'card':
            return cardStyle(style)
        case 'container':
            return containerStyle(style)
        case 'track':
            return trackStyle(style)
        case 'progress':
            return progressStyle(style)
        case 'thumb':
            return thumbStyle(style)
        default:
            console.log('Getting default styles')
            return
    }
}

const cardStyle = (style:any) => {
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        height: '30px',
        ...style
    }
}

const containerStyle = (style:any) => {
    return {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        'border-radius': '5px',
        ...style
    }
}

const trackStyle = (style:any) => {
    return {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'var(--card-background-color)',
        ...style
    }
}

const progressStyle = (style:any) => {
    return {
        height: '100%',
        background: 'var(--paper-item-icon-active-color)',
        position: 'absolute',
        width: '0.00%',
        //'pointer-events': 'none',
        ...style
    }
}

const thumbStyle = (style:any) => {
    return {
        height: '100%',
        background: 'black',
        position: 'absolute',
        right: '-5px',
        width: '10px',
        //'pointer-events': 'none',
        ...style
    }
}