// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function makeId(length: number): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

// https://gist.github.com/codeguy/6684588#gistcomment-2759673
export function slugify(str: string): string {
    str = str.trim()
    str = str.toLowerCase()

    // remove accents, swap ń to n, etc
    const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaaaeeeeiiiioooouuuunc------'

    for (let i = 0; i < from.length; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    return str
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/-/g, '_')
}