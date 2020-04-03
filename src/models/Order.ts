import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

export type OrderType = {
    user: Types.ObjectId,
    status: Types.ObjectId,
    files: {
        file: Types.ObjectId
        doubleSided: boolean,
        group: number,
        bind: boolean
    }[],
    closed: boolean,
    date: Date,
}
const schema = new Schema({
    user: { type: Types.ObjectId, ref: ModelsNames.USER },
    date: { type: String, required: true },
    status: { type: Types.ObjectId, ref: ModelsNames.STATUS },
    files: {
        file: { type: Types.ObjectId, ref: ModelsNames.FILE },
        doubleSided: { type: Boolean, required: true },
        group: { type: Number, required: true },
        bind: { type: Boolean, required: true },
    },
    closed: { type: Boolean, required: true,default:false },
})

export default model<OrderType & Document>(ModelsNames.ORDER, schema, ModelsNames.ORDER)

