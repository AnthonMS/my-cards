export const getStyle = (e: string, styleToMerge: any = {}) => {
    const style = styles[e]
    if (style) {
        return {
            ...style,
            ...styleToMerge
        }
    } else {
        console.log(`${e}: Not found in styles`)
        return
    }
}

const styles = {
    card: {
            // ...(style.backgroundColor && {backgroundColor: style.backgroundColor}),
            height: '30px',
    },
    container: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            'border-radius': '5px',
    },
    track: {
            width: '100%',
            height: '100%',
            position: 'relative',
            background: 'var(--card-background-color)',
    },
    progress: {
            height: '100%',
            background: 'var(--paper-item-icon-active-color)',
            position: 'absolute',
            width: '0.00%',
            //'pointer-events': 'none',
    },
    thumb: {
            height: '100%',
            background: 'black',
            position: 'absolute',
            right: '-5px',
            width: '10px',
            //'pointer-events': 'none',
    }
}