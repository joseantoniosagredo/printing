import * as PPTX from 'nodejs-pptx'

let pptx = new PPTX.Composer()
export function getSlideNumber(path:string):Promise<number>{
    return pptx.load(path).then(()=>{
        return new Promise(resolve => pptx.compose(pres => {
            resolve(Object.keys(pres.powerPointFactory.slides).length)
          }));
    })
    
}
