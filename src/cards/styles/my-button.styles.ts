export const getStyle = (e:string, style:any = {}) => {
    switch (e) {
        case 'card':
            return cardStyle(style)
        case 'icon':
            return iconStyle(style)
        case 'label-wrapper':
            return labelWrapperStyle(style)
        case 'label':
            return labelStyle(style)
        case 'container':
            return containerStyle(style)
        case 'container-column':
            return containerColumnStyle(style)
        case 'row1':
            return row1Style(style)
        case 'row2':
            return row2Style(style)
        case 'row3':
            return row3Style(style)
        case 'column1':
            return column1Style(style)
        case 'column2':
            return column2Style(style)
        default:
            console.log('Getting default styles')
            return
    }
}

const cardStyle = (style:any) => {
    return {
        height: '125px',
        width: '100%',
        'min-width': 'fit-content',
        background: 'var(--card-background-color)',
        ...style
    }
}

const iconStyle = (style:any) => {
    return {
        '--mdc-icon-size': '100%',
        height: '35px',
        width: '35px',
        display: 'inline-block',
        padding: '10px 10px 10px 10px',
        cursor: 'pointer',
        color: 'var(--paper-item-active-icon-color)',
        ...style
    }
}

const labelWrapperStyle = (style:any) => {
    return {
        width: '100%',
        height: '100%',
        display: 'flex',
        // // 'flex-direction': 'column',   /* align children vertically (column format) */
        // 'justify-content': 'center',  /* center children vertically */
        // 'align-items': 'center',      /* center column horizontally */
        // // 'padding-left': '10px',
        ...style
    }
}

const labelStyle = (style:any) => {
    return {
        padding: '0',
        margin: '0 10px',
        color: 'var(--primary-text-color)',
        'font-weight': 'bold',
        ...style
    }
}

// Vertical Layout
const containerStyle = (style:any) => {
    return {
        padding: '0',
        margin: '0',
        display: 'flex',
        'flex-flow': 'column',
        height: '100%',
        ...style
    }
}

const row1Style = (style:any) => {
    return {
        flex: '0 1 auto',
        ...style
    }
}

const row2Style = (style:any) => {
    return {
        flex: '1 1 auto',
        ...style
    }
}
const row3Style = (style:any) => {
    return {
        flex: '0 1 auto',
        margin: '0 2px 2px 2px',
        ...style
    }
}

// Horizontal Style
const containerColumnStyle = (style:any) => {
    return {
        padding: '0',
        margin: '0',
        display: 'flex',
        'flex-flow': 'row',
        height: '100%',
        ...style
    }
}
const column1Style = (style:any) => {
    return {
        flex: '1',
        ...style
    }
}
const column2Style = (style:any) => {
    return {
        flex: '0',
        padding: '3px 3px 3px 0',
        ...style
    }
}