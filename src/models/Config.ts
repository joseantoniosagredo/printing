import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

type FrangeType = {
    start: number,
    end?: number,
    value: number,
}

export type Config = {
    options: any,
    priceWnB: FrangeType[],
    priceColor: FrangeType[],
    email:{
        host:string,
        port:number,
        security:boolean,
        user:string,
        pass:string
    },
    domain:string,
    expired:number
}

const schema = new Schema({
    options: { type: Schema.Types.Mixed, required: true, default: {} },
    priceWnB: [{
        start: { type: Number, required: true },
        end: { type: Number },
        value: { type: Number, required: true },
    }],
    priceColor: [{
        start: { type: Number, required: true },
        end: { type: Number },
        value: { type: Number, required: true },
    }],
    email: {
        host: { type: String, required: true },
        port: { type: Number, required: true },
        securiry: { type: Boolean, required: true },
        user: { type: String, required: true },
        pass: { type: String, required: true },

    },
    domain: { type: String, required: true },
    expired:{ type: Number, required: true },
})

export default model<Config & Document>(ModelsNames.CONFIG, schema, ModelsNames.CONFIG)

