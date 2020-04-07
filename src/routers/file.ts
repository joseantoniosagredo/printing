import { Router, Request } from 'express'
import { Types } from 'mongoose';
import { File } from '../models';
import { FileType } from '../models/File'
import * as upload from 'express-fileupload'
import * as pdf from 'pdf-parse'
import { createFile } from '../cloud/google/storage';
import * as fs from 'fs'
const route = Router()
type File = upload.UploadedFile
route.use(upload({
    useTempFiles: false,
    tempFileDir: '/tmp',
    limits: { fileSize: 50 * 1024 * 1024 },
    //debug:true
}))
//default path file insede 
route.post('/order', (req: Request & { files: { [name: string]: File } }, res) => {
    console.log('_______________________________')
    console.log(req.files)
    console.log(JSON.stringify(req.body))
    if(!req.files || Object.keys(req.files).length===0) return res.status(400).send('Upload at lest 1 file')
    const orderId = new Types.ObjectId()
    fs.mkdir(`/orders/${orderId.toString()}`, (err) => {
        if (err) return res.status(500).send(err)
        Promise.all(Object.keys(req.files).map(name => new Promise((resolve, reject) => {
            let id = new Types.ObjectId()
            let file = req.files[name]
            const path = `/orders/${orderId.toString()}/${id.toString()}.pdf`
            file.mv(path, err => {
                if (err) return reject(err)
                pdf(file.data).then(pages => {
                    let fileJson: FileType = {
                        destination: path,
                        filename:id.toString(),
                        originalName: file.name,
                        pages: pages.numpages,
                        mimetype: file.mimetype,
                        path: '/api/file/' + id.toString(),
                        size: file.size,
                        encoding: file.encoding,
                    }
                    let newFile = new File({_id:id,...fileJson})
                    newFile.save((err, fileDB) => {
                        if (err) return reject(err)
                        resolve(fileDB)
                    })
                }).catch(reject)

            })
        }))).then((files) => {

            res.send(files)
        }).catch(err => res.status(500).send(err))
    })
})
route.post('/pagesof', (req: Request & { files: { [name: string]: File } }, res) => {
    console.log(req.files)
    Promise.all(Object.keys(req.files).map(name => new Promise((resolve, reject) => {
        pdf(req.files[name].data).then(data => {
            resolve({ name, pages: data.numpages })
        }).catch(err => console.error(err))
    }))).then((data: { name: string, pages: number }[]) => {
        const result = {}
        data.forEach(d => result[d.name] = d.pages)
        res.send(result)
    })
})
route.get('/file/:id', (req, res) => {
    File.findById(req.params.id, (err, img) => {
        if (err) return res.status(500).send(err.message)
        if (!img) return res.sendStatus(404)
        res.sendFile(img.destination)
    })


})

export default route
