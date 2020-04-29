/**
 * 
 * @param {Number} pages 
 * @param {Number} group 
 * @param {Boolean} doubleSided 
 * @param {Number} copies 
 */
export function calculatePages(pages, group, doubleSided, copies = 1) {
    var result = pages * copies
    var div = doubleSided ? group * 2 : group
    return result % div === 0 ? result / div : Math.trunc(result / div) + 1

}
export function calculatePrice(data, config) {
    const color = data.filter(e => e.color)
    const wnb = data.filter(e => !e.color)
    const priceColor = color.map(file => {
        var pages = calculatePages(file.pages, file.group, file.doubleSided, file.copies)
        return config.priceColor.find(price => price.start <= pages && (!price.end || price.end >= pages)).value * pages
    }).reduce((a, b) => a + b, 0)
    const priceWnB = wnb.map(file => {
        var pages = calculatePages(file.pages, file.group, file.doubleSided, file.copies)
        return config.priceWnB.find(price => price.start <= pages && (!price.end || price.end >= pages)).value * pages
    }).reduce((a, b) => a + b, 0)
    return priceColor + priceWnB
}