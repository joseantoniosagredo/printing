import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

type FrangeType = {
    start:number,
    end?:number,
    value:number,
}

export type Config = {
    options:any,
    priceWnB:FrangeType[],
    priceColor:FrangeType[]
}

const schema = new Schema({
    options:{type:Schema.Types.Mixed, required:true, default:{}},
    priceWnB:[{
        start:{type:Number, required:true},
        end:{type:Number},
        value:{type:Number, required:true},
    }],
    priceColor:[{
        start:{type:Number, required:true},
        end:{type:Number},
        value:{type:Number, required:true},
    }]
})

export default model<Config & Document>(ModelsNames.CONFIG, schema, ModelsNames.CONFIG)

