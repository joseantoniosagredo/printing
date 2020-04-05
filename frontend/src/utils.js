/**
 * 
 * @param {Number} pages 
 * @param {Number} group 
 * @param {Boolean} doubleSided 
 * @param {Number} copies 
 */
export function calculatePages(pages,group,doubleSided,copies=1){
    var result = pages*copies
    var div = doubleSided ? group*2 : group
    return result%div===0 ? result/div : Math.trunc(result/div)+1

}