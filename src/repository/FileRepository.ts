import { File } from "../models"
import { Types } from "mongoose"
import HttpError, { Callback } from "../utils"
import * as fs from 'fs'

export function removeFile(id:string,callback:Callback<never,HttpError>){
    File.findById(id,(err,file)=>{
        if(err) return callback(new HttpError(err))
        if(!file) return callback(new HttpError('File not found',404))
        if(!file.deleted) return callback(new HttpError('File has already been deleted',400))
        file.deleted = true
        fs.unlink(file.path,(err)=>{
            if(err) return callback(new HttpError(err))
            callback(null)
        })
    })
}
