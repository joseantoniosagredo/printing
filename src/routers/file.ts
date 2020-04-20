import { Router, Request } from 'express'
import { Types } from 'mongoose';
import { File } from '../models';
import { FileType, FileDocumentType } from '../models/File'
import * as upload from 'express-fileupload'
import * as pdf from 'pdf-parse'
import { createFile } from '../cloud/google/storage';
import * as fs from 'fs'
import Order, { OrderType, FileOrderType, FileOrderPopulatedType } from '../models/Order';
import { getDefaultStatus } from '../repository/StatusRepository';
import { calculatePrice } from '../repository/ConfigRepository';
type File = upload.UploadedFile
type Metadata = {
    dobleSided: boolean,
    group: number,
    bind: boolean,
    copies: number,
    color: boolean,
    id: number,
}

const route = Router()

route.use(upload({
    useTempFiles: false,
    tempFileDir: '/tmp',
    limits: { fileSize: 50 * 1024 * 1024 },
    //debug:true
}))
//default path file insede 
route.post('/order', (req: Request & { files: { [name: string]: File } }, res) => {
    let user = req.session.user
    var metadata: Metadata[] = JSON.parse(req.body.metadata)
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send('Upload at lest 1 file')
    const orderId = new Types.ObjectId()
    fs.mkdir(`/orders/${orderId.toString()}`, (err) => {
        if (err) return res.status(500).send(err)
        Promise.all(Object.keys(req.files).map(webId => new Promise<{ file: FileDocumentType, webId: number }>((resolve, reject) => {
            let id = new Types.ObjectId()
            let file = req.files[webId]
            const path = `/orders/${orderId.toString()}/${id.toString()}.pdf`
            file.mv(path, err => {
                if (err) return reject(err)
                pdf(file.data).then(pages => {
                    let fileJson: FileType = {
                        destination: path,
                        filename: id.toString(),
                        originalName: file.name,
                        pages: pages.numpages,
                        mimetype: file.mimetype,
                        path: '/api/file/' + id.toString(),
                        size: file.size,
                        encoding: file.encoding,
                    }
                    let newFile = new File({ _id: id, ...fileJson })
                    newFile.save((err, fileDB) => {
                        if (err) return reject(err)
                        resolve({ file: fileDB, webId: parseInt(webId) })
                    })
                }).catch(reject)

            })
        }))).then((files) => {
            if (files.some(obj => metadata.find(e => e.id === obj.webId) === undefined))
                return res.status(400).send('Some metadata is wrong')
            getDefaultStatus((err, status) => {
                if (err) return res.status(500).send(err)
                if (!status) return res.status(500).send('There aren\'t default status')
                let error: string | null = null
                let fileOrder: FileOrderPopulatedType[] = files.map(obj => {
                    let meta = metadata.find(e => e.id === obj.webId)
                    if (meta)
                        return {
                            file: obj.file,
                            bind: meta.bind,
                            doubleSided: meta.dobleSided,
                            group: meta.group,
                            color: meta.color,
                            copies: meta.copies
                        }
                    else
                        error = 'Metadata of id: ' + obj.webId + ' not found \n ' + JSON.stringify(metadata)

                })
                if (error) res.status(400).send(error)
                calculatePrice(fileOrder, (err, price) => {
                    if (err) return res.status(500).send(err)
                    let order: OrderType = {
                        files: fileOrder.map(file => ({ ...file, file: file.file._id })),
                        closed: false,
                        status: status._id,
                        date: new Date(),
                        user: user, //TODO
                        price: price
                    }
                    let orderdb = new Order(order)
                    orderdb.save(err => {
                        if (err) return res.status(500).send(err)
                        res.send(orderdb)
                    })

                })
            })

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
