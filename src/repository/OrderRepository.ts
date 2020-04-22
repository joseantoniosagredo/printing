import { Types } from "mongoose";
import { Callback } from "../utils";
import Order, { OrderType } from "../models/Order";
import { ModelsNames } from '../models/enums'
let localField = 'files.file'
export function getOrderByUser(userId: Types.ObjectId, callback: Callback<OrderType[]>) {
    Order.aggregate([{
        $match: {
            user: new Types.ObjectId(userId)
        }
    }, {
        $lookup: {
            from: ModelsNames.STATUS,
            localField: 'status',
            foreignField: '_id',
            as: 'status'
        }
    }, {
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
            _id: '_id',
            files: { $push: '$files' },
            price: { $last: '$price' },
            status: { $last: '$status' },
            date: { $last: '$date' },
            user: { $last: '$user' }
        }
    }], callback)
}
type Options = {
    status: string,
    user: string
}
export function getOrderFiltered(options: Partial<Options>, pagesOptions: { page: number, pageSize: number }, callback: Callback<any>) {
    console.log(options)
    const match: any[] = options.status ? [{
        $match: {
            status: new Types.ObjectId(options.status)
        }
    }] : []
    const matchUser:any[] = options.user ? [{
        $match:{
            'user.name':{$regex:options.user, $options:'i'}
        }
    }] : []
    Order.aggregate(match.concat([
        {
            $lookup:{
                from: ModelsNames.USER,
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        ...matchUser
        ,
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
            $project: {"user.password":0}
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
                _id: '_id',
                files: { $push: '$files' },
                price: { $last: '$price' },
                status: { $last: '$status' },
                date: { $last: '$date' },
                user: { $last: '$user' }
            }
        }]), callback)
}