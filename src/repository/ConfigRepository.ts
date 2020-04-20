import { FileOrderPopulatedType } from "../models/Order";
import { Config } from "../models";

function calculatePages(pages: number, group: number, doubleSided: boolean, copies :number) {
    var result = pages * copies
    var div = doubleSided ? group * 2 : group
    return result % div === 0 ? result / div : Math.trunc(result / div) + 1

}

export function calculatePrice(data: FileOrderPopulatedType[], cb: (err: Error | null, price?: number) => void) {
    Config.findOne({}, (err, config) => {
        if (err) return cb(err)
        if (!config) return cb(new Error('Desconfiguration'))
        const color = data.filter(e => e.color)
        const wnb = data.filter(e => !e.color)
        const priceColor = color.map(file =>{
            var pages = calculatePages(file.file.pages,file.group,file.doubleSided,file.copies)
            return config.priceColor.find(price => price.start <= pages && (!price.end || price.end >= pages)).value * pages
        }).reduce((a, b) => a + b,0)
        const priceWnB = wnb.map(file =>{
            var pages = calculatePages(file.file.pages,file.group,file.doubleSided,file.copies)
            return config.priceWnB.find(price => price.start <= pages && (!price.end || price.end >= pages)).value * pages
        }).reduce((a, b) => a + b,0)
        cb(null, priceColor + priceWnB)
    })
}