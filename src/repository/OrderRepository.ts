import { Types } from "mongoose";
import HttpError, { Callback } from "../utils";
import Order, { OrderType } from "../models/Order";
import { ModelsNames } from '../models/enums'
import { File } from "../models";
import {getFinalStatus} from './StatusRepository'
import * as fs from 'fs'
import * as Q from 'q'

let localField = 'files.file'
export function getOrderByUser(userId: Types.ObjectId, callback: Callback<OrderType[]>) {
    Order.aggregate([{
        $match: {
            user: new Types.ObjectId(userId)
        }
    },
    {
        $lookup: {
            from: ModelsNames.STATUS,
            localField: 'status',
            foreignField: '_id',
            as: 'status'
        }
    },
    {
        $lookup: {
            from: ModelsNames.USER,
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $unwind: '$status'
    },
    {
        $unwind: '$user'
    },
    {
        $project: { "user.password": 0 }
    },
    {
        $unwind: '$files'
    },
    {
        $lookup: {
            from: ModelsNames.FILE,
            localField,
            foreignField: '_id',
            as: localField
        }
    },
    {
        $unwind: '$files.file'
    },
    {
        $group: {
            _id: '$_id',
            files: { $push: '$files' },
            price: { $last: '$price' },
            status: { $last: '$status' },
            date: { $last: '$date' },
            user: { $last: '$user' },
            closed: { $last: '$closed' },
        }
    }], callback)
}
type Options = {
    status: string,
    user: string
}
export function getOrderFiltered(options: Partial<Options>, pagesOptions: { page: number, pageSize: number }, callback: Callback<any>) {
    console.log(options)
    const matchStatus: any[] = options.status ? [{
        $match: {
            status: new Types.ObjectId(options.status)
        }
    }] : []
    const matchUser: any[] = options.user ? [{
        $match: {
            'user.name': { $regex: options.user, $options: 'i' }
        }
    }] : []
    const match = matchStatus.concat([
        {
            $lookup: {
                from: ModelsNames.USER,
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        ...matchUser
    ])
    Order.aggregate(match.concat([
        {
            $count: 'count'
        }]), (err, [count]) => {
            if (err) return callback(err)
            Order.aggregate(match.concat([
                {
                    $skip: (pagesOptions.page - 1) * pagesOptions.pageSize
                },
                {
                    $limit: pagesOptions.pageSize
                },
                {
                    $lookup: {
                        from: ModelsNames.STATUS,
                        localField: 'status',
                        foreignField: '_id',
                        as: 'status'
                    }
                },
                {
                    $unwind: '$status'
                },
                {
                    $unwind: '$user'
                },
                {
                    $project: { "user.password": 0 }
                },
                {
                    $unwind: '$files'
                },
                {
                    $lookup: {
                        from: ModelsNames.FILE,
                        localField,
                        foreignField: '_id',
                        as: localField
                    }
                },
                {
                    $unwind: '$files.file'
                },
                {
                    $group: {
                        _id: '$_id',
                        files: { $push: '$files' },
                        price: { $last: '$price' },
                        status: { $last: '$status' },
                        date: { $last: '$date' },
                        user: { $last: '$user' },
                        closed: { $last: '$closed' },
                    }
                }]), (err, data) => {
                    if (err) return callback(err)
                    return callback(null, {
                        metadata: {
                            ...count,
                            page: pagesOptions.page,
                            pageSize: pagesOptions.pageSize
                        }, data
                    })
                })
        })

}

export function patchOrder(_id:Types.ObjectId,patch:Partial<OrderType>,callback:Callback<OrderType>){
    Order.update({_id:new Types.ObjectId(_id)},{$set:patch},callback)
}
export function closeOrder(_id:Types.ObjectId,callback:Callback<OrderType,HttpError>){
    getFinalStatus((err,status)=>{
        if(err) return callback(new HttpError(err))
        if(!status) return callback(new HttpError('Status not found',501))
        Order.findById(_id,(err,order)=>{
            if(err) return callback(err)
            const files = order.files.map(e => e.file)
            Q.all(files.map(fileId => Q.Promise((resolve,reject)=>{
                File.findById(fileId,(err,file)=>{
                    if(err) return reject(err)
                    fs.unlink(file.destination,err => {
                        if(err) return reject(err)
                        file.deleted = true
                        file.save(err => {
                            if(err) return reject(err)
                            resolve()    
                        })
                    })
                })
            }))).then(()=>{
                order.closed = true
                order.status = status._id
                order.save(callback)
            }).catch(err => callback(new HttpError(err)))
        })
    })
    
}