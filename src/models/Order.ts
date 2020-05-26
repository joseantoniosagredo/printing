import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';
import { FileType, FileDocumentType } from './File';
export type FileOrderType = {
    file: Types.ObjectId
    doubleSided: boolean,
    group: number,
    bind: boolean,
    color:boolean,
    copies:number
}
export type FileOrderPopulatedType = {
    file: FileDocumentType
    doubleSided: boolean,
    group: number,
    bind: boolean,
    color:boolean,
    copies:number,
    stapled: boolean
}
export type OrderType = {
    user: Types.ObjectId,
    status: Types.ObjectId,
    files: FileOrderType[],
    closed: boolean,
    date: Date,
    price:number
}
const schema = new Schema({
    user: { type: Types.ObjectId, ref: ModelsNames.USER },
    date: { type: String, required: true },
    status: { type: Types.ObjectId, ref: ModelsNames.STATUS },
    files: [{
        file: { type: Types.ObjectId, ref: ModelsNames.FILE },
        doubleSided: { type: Boolean, required: true },
        group: { type: Number, required: true },
        bind: { type: Boolean, required: true },
        color: { type: Boolean, required: true },
        stapled:{ type: Boolean, required: true },
        copies: { type: Number, required: true },
    }],
    closed: { type: Boolean, required: true,default:false },
    price: { type: Number, required: true },
})

export default model<OrderType & Document>(ModelsNames.ORDER, schema, ModelsNames.ORDER)

