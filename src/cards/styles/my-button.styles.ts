export const getStyle = (e: string, styleToMerge: any = {}) => {
    const style = styles[e]
    if (style) {
        return style(styleToMerge)
    } else {
        console.log(`${e}: Not found in styles`)
        return
    }
}

const styles = {
    card: (style: any) => {
        return {
            height: '125px',
            width: '100%',
            'min-width': 'fit-content',
            background: 'var(--card-background-color)',
            overflow: 'hidden',
            cursor: 'pointer',
            ...style
        }
    },
    icon: (style: any) => {
        return {
            '--mdc-icon-size': '100%',
            height: '35px',
            width: '35px',
            display: 'inline-block',
            padding: '10px 0 0 10px',
            color: 'var(--paper-item-icon-color)',
            ...style
        }
    },
    stats: (style: any) => {
        return {
            'margin-left': 'auto',
            'margin-right': '5px',
            'margin-top': '5px',
            'margin-bottom': '5px',
            'color': 'var(--primary-text-color)',
            // 'border-radius': '50%',
            'display': 'grid',
            'place-items': 'center',
            'aspect-ratio': '1 / 1',
            // 'box-shadow': '0px 0px 10px 0px rgba(0,0,0,0.75)',
            'font-family': '"Arial", sans-serif',
            'font-size': '11px',
            'text-align': 'center',
            'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)',
            // 'transform': 'scale(0.9)',
            ...style
        }
    },
    'label-wrapper': (style: any) => {
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
    },
    label: (style: any) => {
        return {
            padding: '0',
            margin: '0 10px',
            color: 'var(--primary-text-color)',
            'font-weight': 'bold',
            cursor: 'pointer',
            ...style
        }
    },
    container: (style: any) => {
        return {
            padding: '0',
            margin: '0',
            display: 'flex',
            'flex-flow': 'column',
            height: '100%',
            ...style
        }
    },
    row1: (style: any) => {
        return {
            flex: '0 1 auto',
            display: 'flex',
            'justify-content': 'space-between',
            ...style
        }
    },
    row2: (style: any) => {
        return {
            flex: '1 1 auto',
            ...style
        }
    },
    row3: (style: any) => {
        return {
            flex: '0 1 auto',
            ...style
        }
    },
    'container-column': (style: any) => {
        return {
            padding: '0',
            margin: '0',
            display: 'flex',
            'flex-flow': 'row',
            height: '100%',
            ...style
        }
    },
    column1: (style: any) => {
        return {
            flex: '1',
            ...style
        }
    },
    column2: (style: any) => {
        return {
            flex: '0',
            ...style
        }
    }
}