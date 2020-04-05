import { Router, Request } from 'express'
import { Types } from 'mongoose';
import { File, } from '../models';
import * as upload from 'express-fileupload'
import * as pdf from 'pdf-parse'
const route = Router()
const pathFiles = '/images/'
export const urlFile = '/image'
type File = upload.UploadedFile
route.use(upload({
    useTempFiles:false,
    tempFileDir:'/tmp',
    limits: { fileSize: 50 * 1024 * 1024 },
    debug:true
}))
//default path file insede 
route.post('/order', (req:Request & {files:{[name:string]:File}}, res) => {
    console.log(req.files)
    Object.keys(req.files).forEach(name => {
        pdf(req.files[name].data).then(data => {
            console.log(name,data.numpages)
        }).catch(err => console.error(err))
    })
    //install https://www.npmjs.com/package/pdfreader
    res.send()
})
route.post('/pagesof', (req:Request & {files:{[name:string]:File}}, res) => {
    console.log(req.files)
    Promise.all(Object.keys(req.files).map(name => new Promise((resolve,reject)=>{
        pdf(req.files[name].data).then(data => {
            resolve({name,pages:data.numpages})
        }).catch(err => console.error(err))
    }))).then((data:{name:string,pages:number}[]) => {
        const result = {}
        data.forEach(d => result[d.name]=d.pages)
        res.send(result)
    })
})
route.get(urlFile + '/:id', (req, res) => {
    File.findById(req.params.id, (err, img) => {
        if (err) return res.status(500).send(err.message)
        if (!img) return res.sendStatus(404)
        res.sendFile(pathFiles + img.filename)
    })


})

export default route
