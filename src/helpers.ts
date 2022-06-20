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
