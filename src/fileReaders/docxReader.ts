import * as fs from 'fs'
import * as libre from 'libreoffice-convert'
import * as pdf from 'pdf-parse'
import { Callback } from '../utils';

export function getPagesNumber(path:string):Promise<number>{
    return new Promise((resolve,reject)=>{
        const file = fs.readFileSync(path)
        console.log(file)
        libre.convert(file, '.pdf', undefined, (err, done) => {
            console.log(done)
            if (err) {
                console.error(err)
              return reject(err)
            }
            console.log('_________________')
            pdf(done).then(data => resolve(data.numpages)).catch(reject)
        });
    })
}
