export const getStyle = (e: string, styleToMerge: any = {}) => {
    const style = styles[e]
    if (style) {
        return {
            ...style,
            ...styleToMerge
        }
    } else {
        console.log(`${e}: Not found in styles`)
        return styleToMerge
    }
}

const styles = {
    card: {
            height: '125px',
            width: '100%',
            // 'min-width': 'fit-content',
            background: 'var(--card-background-color)',
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'flex',
            'flex-direction': 'column',
    },
    icon: {
            '--mdc-icon-size': '100%',
            height: '35px',
            width: '35px',
            display: 'inline-block',
            color: 'var(--paper-item-icon-color)',
            'border-radius': '50%',
            margin: '7px 0px 0px 7px',
    },
    stats: {
            'margin': '5px 2px 0px auto',
            'color': 'var(--primary-text-color)',
            // 'border-radius': '25px',
            // 'overflow': 'hidden',
            'display': 'inline-block',
            // 'box-shadow': '0px 4px 8px rgba(0, 0, 0, 0.2)',
            'font-family': '"Arial", sans-serif',
            'font-size': '11px',
            'text-align': 'center',
            'text-shadow': '2px 2px 4px rgba(0, 0, 0, .9)',
            width: '50px',
            height: '50px',
            padding: '0px 3px'
    },
    camera: {
        'border-radius': '3px',
        'overflow': 'hidden',
    },
    labelContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        overflow: 'hidden',
    },
    label: {
        padding: '0',
        margin: '0 10px',
        color: 'var(--primary-text-color)',
        'font-weight': 'bold',
        cursor: 'pointer',
    },
    extraText: {
        margin: '0 10px',
        color: 'var(--primary-text-color)',
        'font-weight': 'normal',
        'font-size': '12px',
        'white-space': 'nowrap',
        overflow: 'hidden',
        // 'text-overflow': 'ellipsis'
        // animation: 'marquee 10s linear infinite',
    },
    row1: {
        display: 'flex',
        'justify-content': 'space-between',
        'min-height': '55px',
    },
    row2: {
    },
    
    buttonsContainer: {
        display: 'flex',
        'align-items': 'flex-start',
        'flex-direction': 'row',
        padding: '0px 5px'
    },
    button: {
        padding: '3px 5px 3px 5px',
        'aspect-ratio': '1 / 1',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        // 'border-radius': '50%',
        // 'box-shadow': '0px 4px 8px rgba(0, 0, 0, 0.2)',
        // 'border': '1px solid var(--secondary-background-color)'
    },
    buttonText: {
        padding: '0px',
        margin: '0px',
    },
    buttonIcon: {
        padding: '0px',
        margin: '0px',
        position: 'relative',
        '--mdc-icon-size': '100%',
        display: 'flex',
        height: '20px',
        width: '20px'
    },

    sliderCard: {
        'border-radius': '0px',
        background: 'transparent',
        'box-shadow': 'none',
        cursor: 'default',
    },
    sliderContainer: {
        'border-radius': '0px',
    },
    sliderTrack: {
        background: 'transparent',
    },
    sliderThumbHor: {
        'height': '20px',
        'width': '3px',
        'top': '6px',
        'right': '2px',
        'border-radius': '50px',
    },
    sliderThumbVer: {
        'width': '20px',
        'height': '3px',
        'top': '2px',
        'left': '7px',
        'border-radius': '50px',
    },
    sliderProgressHor: {
        'background': 'linear-gradient(to top, var(--paper-item-icon-active-color), transparent)'
    },
    sliderProgressVer: {
        'background': 'linear-gradient(to left, var(--paper-item-icon-active-color), transparent)'
    },

    seekbarCard: {
        'border-radius': '0px',
        background: 'transparent',
        'box-shadow': 'none',
        cursor: 'default',
        'margin-left': '30px'
    },
    seekbarContainer: {
        'border-radius': '0px',
    },
    seekbarTrack: {
        background: 'transparent',
    },
    seekbarThumb: {
        'height': '100%',
        'width': '3px',
        // 'top': '6px',
        'right': '0px',
        'border-radius': '50px',
        'background': 'linear-gradient(to top, var(--paper-item-icon-active-color) -20%, transparent 70%)'
    },
    seekbarProgress: {
        'background': 'transparent'
    }
}