import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

export type StatusType = {
    name:string,
    isFinish:boolean
    default:boolean
}
export type StatusDocumentType = StatusType & Document
const schema = new Schema({
    name: { type: String, required: true },
    isFinish: { type: Boolean, required: true, default:false },
    default:{ type: Boolean, required: true, default:false },
})

export default model<StatusType & Document>(ModelsNames.STATUS, schema, ModelsNames.STATUS)

