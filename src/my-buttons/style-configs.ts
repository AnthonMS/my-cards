export const getStyle = (e:string, style:any) => {
    switch (e) {
        case 'my-button-card':
            // console.log('Getting my-button-card styles')
            return cardStyle(style)
        case 'my-button-icon':
            // console.log('Getting my-button-card styles')
            return iconStyle(style)
        case 'my-button-label':
            return labelStyle(style)
        default:
            console.log('Getting default styles')
            return
    }
}

const cardStyle = (style:any) => {
    if (!style) style = {}
    // console.log('creating default styles for card:', style)
    // var mainSliderColor = conf.mainSliderColor ? conf.mainSliderColor : "var(--accent-color)";
    // var secondarySliderColor = conf.secondarySliderColor ? conf.secondarySliderColor : "#4d4d4d";
    // var mainSliderColorOff = conf.mainSliderColorOff ? conf.mainSliderColorOff : "#636363";
    // var secondarySliderColorOff = conf.secondarySliderColorOff ? conf.secondarySliderColorOff : "#4d4d4d";
    
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        height: style.height ? style.height : '125px',
        width: style.width ? style.width : '100%',
        ...style
    }
}
const iconStyle = (style:any) => {
    if (!style) style = {}
    // console.log('creating default styles for card:', style)
    // var mainSliderColor = conf.mainSliderColor ? conf.mainSliderColor : "var(--accent-color)";
    // var secondarySliderColor = conf.secondarySliderColor ? conf.secondarySliderColor : "#4d4d4d";
    // var mainSliderColorOff = conf.mainSliderColorOff ? conf.mainSliderColorOff : "#636363";
    // var secondarySliderColorOff = conf.secondarySliderColorOff ? conf.secondarySliderColorOff : "#4d4d4d";
    
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        height: style.height ? style.height : '35px',
        width: style.width ? style.width : '35px',
        display: style.display ? style.display : 'inline-block',
        padding: style.padding ? style.padding : '10px 10px 10px 10px',
        ...style
    }
}
const labelStyle = (style:any) => {
    if (!style) style = {}
    // console.log('creating default styles for card:', style)
    // var mainSliderColor = conf.mainSliderColor ? conf.mainSliderColor : "var(--accent-color)";
    // var secondarySliderColor = conf.secondarySliderColor ? conf.secondarySliderColor : "#4d4d4d";
    // var mainSliderColorOff = conf.mainSliderColorOff ? conf.mainSliderColorOff : "#636363";
    // var secondarySliderColorOff = conf.secondarySliderColorOff ? conf.secondarySliderColorOff : "#4d4d4d";
    
    return {
        // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
        padding: style.padding ? style.padding : '0',
        margin: style.margin ? style.margin : '0 10px',
        ...style
    }
}