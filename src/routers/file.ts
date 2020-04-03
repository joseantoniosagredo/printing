import * as multer from 'multer'
import { Router } from 'express'
import { Types } from 'mongoose';
import { File, } from '../models';

const route = Router()
const pathFiles = '/images/'
export const urlFile = '/image'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathFiles)
    },
    filename: function (req, file, cb) {

        cb(null, new Types.ObjectId().toString())
    },
})
const upload = multer({
    storage,
})

//default path file insede 
route.post(urlFile, upload.array('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    //install https://www.npmjs.com/package/pdfreader
    res.send()
})

route.get(urlFile + '/:id', (req, res) => {
    File.findById(req.params.id, (err, img) => {
        if (err) return res.status(500).send(err.message)
        if (!img) return res.sendStatus(404)
        res.sendFile(pathFiles + img.filename)
    })


})

export default route
