export const getStyle = (e:string, style:any) => {
    switch (e) {
        case 'my-button-card':
            return cardStyle(style)
        case 'my-button-icon':
            return iconStyle(style)
        case 'my-button-label':
            return labelStyle(style)
        case 'my-button-label-vertical':
            return labelStyleVertical(style)
        case 'my-button-label-wrapper':
            return labelWrapperStyle(style)
        case 'my-button-slider':
            return sliderStyles(style)
        case 'my-button-slider-vertical':
            return sliderStyles(style, true)
        case 'my-button-slider-wrapper':
            return sliderWrapperStyle(style)
        default:
            console.log('Getting default styles')
            return
    }
}

const cardStyle = (style:any) => {
    if (!style) style = {}
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        height: style.height ? style.height : '125px',
        width: style.width ? style.width : '100%',
        'min-width': 'fit-content',
        background: style.background ? style.background : 'var(--card-background-color)',
        ...style
    }
}
const iconStyle = (style:any) => {
    if (!style) style = {}
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        height: style.height ? style.height : '35px',
        width: style.width ? style.width : '35px',
        display: style.display ? style.display : 'inline-block',
        padding: style.padding ? style.padding : '10px 10px 10px 10px',
        cursor: 'pointer',
        color: style.color ? style.color : 'var(--paper-item-active-icon-color)',
        ...style
    }
}
const labelStyle = (style:any) => {
    if (!style) style = {}    
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        padding: style.padding ? style.padding : '0',
        margin: style.margin ? style.margin : '0 10px',
        color: style.color ? style.color : 'var(--primary-text-color)',
        'font-weight': 'bold',
        ...style
    }
}
const labelStyleVertical = (style:any) => {
    if (!style) style = {}
    return {
        padding: 0,
        margin: '0 10px',
        color: 'var(--primary-text-color)',
        'font-weight': 'bold',
        transform: 'rotate(270deg)',
        ...style
    }
}
const labelWrapperStyle = (style:any) => {
    if (!style) style = {}
    return {
        width: '30px',
        height: '100%',
        display: 'flex',            /* establish flex container */
        'flex-direction': 'column',   /* align children vertically (column format) */
        'justify-content': 'center',  /* center children vertically */
        'align-items': 'center',      /* center column horizontally */
        'padding-left': '10px',
        ...style
    }
}

const sliderStyles = (styles, vertical = false) => {
    if (!styles || Object.keys(styles).length === 0) styles = { container: {}, input: {}, track: {}, thumb: {}}

    if (!vertical) {
        const containerStyle = sliderContainerStyle(styles.container ? styles.container : {})
        const inputStyle = sliderInputStyle(styles.input ? styles.input : {})
        const trackStyle = sliderTrackStyle(styles.track ? styles.track : {})
        const thumbStyle = sliderThumbStyle(styles.thumb ? styles.thumb : {})
        return {containerStyle, inputStyle, trackStyle, thumbStyle }
    }
    else {
        const containerStyle = sliderContainerStyleVertical(styles.container ? styles.container : {})
        const inputStyle = sliderInputStyleVertical(styles.input ? styles.input : {})
        // const trackStyle = sliderTrackStyle(styles.track ? styles.track : {})
        // const thumbStyle = sliderThumbStyle(styles.thumb ? styles.thumb : {})
        return {containerStyle, inputStyle}
    }
}
const sliderContainerStyle = (style:any) => {
    if (!style) style = {}
    return {
        height: '30px',
        position: 'relative',
        overflow:  'hidden',
        'border-radius': '5px',
        '--slider-color': 'var(--paper-item-icon-active-color)',
        ...style
    }
}
const sliderInputStyle = (style:any) => {
    if (!style) style = {}
    return {
        outline: '0',
        border: '0',
        width: '100%',
        height: '100%',
        'border-radius': '5px',
        'background-color': '#4d4d4d', /*Remaining Slider color*/
        margin: '0',
        transition: 'box-shadow 0.2s ease-in-out',
        overflow: 'hidden',
        '-webkit-appearance': 'none',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        right: '0px',
        left: '0px',
        'pointer-events': 'auto',
        ...style
    }
}


const sliderWrapperStyle = (style:any) => {
    if (!style) style = {}
    return {
        width: '30px',
        height: '100%',
        display: 'flex',            /* establish flex container */
        'flex-direction': 'column',   /* align children vertically (column format) */
        'justify-content': 'center',  /* center children vertically */
        'align-items': 'center',      /* center column horizontally */
        'margin-right': '3px',
        'pointer-events': 'auto',
        ...style
    }
}

const sliderContainerStyleVertical = (style:any) => {
    if (!style) style = {}
    return {
        ...style,
        height: style.width ? style.width : '30px',
        width: style.height ? style.height : 'calc(125px - 4px)',
        overflow: style.overflow ? style.overflow : 'hidden',
        'border-radius': style['border-radius'] ? style['border-radius'] : '5px',
        '--slider-color': style.color ? style.color : '#4d4d4d',
        display: style.flex ? style.flex : 'flex',            /* establish flex container */
        'flex-direction': style['flex-direction'] ? style['flex-direction'] : 'column',   /* align children vertically (column format) */
        'justify-content': style['justify-content'] ? style['justify-content'] : 'center',  /* center children vertically */
        'align-items': style['align-items'] ? style['align-items'] : 'center',      /* center column horizontally */
        '-webkit-transform': style['-webkit-transform'] ? style['-webkit-transform'] : 'rotate(270deg)',
        '-moz-transform': style['-moz-transform'] ? style['-moz-transform'] : 'rotate(270deg)',
        '-o-transform': style['-o-transform'] ? style['-o-transform'] : 'rotate(270deg)',
        '-ms-transform': style['-ms-transform'] ? style['-ms-transform'] : 'rotate(270deg)',
        transform: style.transform ? style.transform : 'rotate(270deg)',
        'pointer-events': style['pointer-events'] ? style['pointer-events'] : 'auto'
    }
}
const sliderInputStyleVertical = (style:any) => {
    if (!style) style = {}
    return {
        outline: '0',
        border: '0',
        'border-radius': '5px',
        'background-color': 'var(--paper-item-icon-active-color)', /*Slider Color*/
        margin: '0',
        transition: 'box-shadow 0.2s ease-in-out',
        overflow: 'hidden',
        '-webkit-appearance': 'none',
        'pointer-events': 'auto',
        ...style
    }
}




















// height: 100%;
// -webkit-appearance: none;
// color: var(--accent-color);
// transition: box-shadow 0.2s ease-in-out;
const sliderTrackStyle = (style:any) => {
    if (!style) style = {}
    return {
        height: '100%',
        '-webkit-appearance': 'none',
        color: 'red',
        transition: 'box-shadow 0.2s ease-in-out',
        ...style
    }
}
const sliderThumbStyle = (style:any) => {
    if (!style) style = {}
    return {
        width: '25px',
        height: '80px',
        '-webkit-appearance': 'none',
        cursor: 'ew-resize',
        'border-radius': '0',
        transition: 'box-shadow 0.2s ease-in-out',
        position: 'relative',
        'box-shadow': '-3500px 0 0 3500px var(--accent-color), inset 0 0 0 25px #FFFFFF',
        top: 'calc((100% - 80px) / 2)',
        'border-right': '10px solid var(--accent-color)',
        'border-left': '10px solid var(--accent-color)',
        'border-top': '20px solid var(--accent-color)',
        'border-bottom': '20px solid var(--accent-color)',
        'pointer-events': 'auto',
        ...style
    }
}