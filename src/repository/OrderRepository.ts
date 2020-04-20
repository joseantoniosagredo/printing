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
    },{
        $unwind:'$files'
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
        $unwind:'$files.file'
    },
    {
        $group:{
            _id:'_id',
            files:{$push:'$files'},
            price:{$last:'$price'},
            status:{$last:'$status'},
            date:{$last:'$date'},
            user:{$last:'$user'}
        }
    }],callback)
}
