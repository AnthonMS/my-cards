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
    },
    // #56: static marker line(s) on the track, one per `markers:` entry. Positioned
    // by the card along the slider axis; everything else can be overridden through
    // styles.marker. Sits above the progress bar but below the thumb.
    marker: {
            position: 'absolute',
            width: '2px',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.35)',
            'pointer-events': 'none',
            'z-index': '2',
    },
    // #23: floating value bubble shown while dragging when showValue is enabled.
    // It sits ABOVE the card at the thumb position and follows the thumb (the card
    // drives `left`/`top` and toggles `display`); everything else can be overridden
    // through styles.value. Setting your own left (horizontal) / top (vertical)
    // disables the tracking.
    value: {
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '0%',
            transform: 'translate(-50%, 0)',
            padding: '2px 8px',
            'border-radius': '4px',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            'font-size': '12px',
            'line-height': 'normal',
            'white-space': 'nowrap',
            'pointer-events': 'none',
            display: 'none',
            'z-index': '10',
    }
}