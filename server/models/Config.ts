import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

export type Config = {
    options:any
}

const schema = new Schema({
    options:{type:Schema.Types.Mixed, required:true, default:{}}
})

export default model<Config & Document>(ModelsNames.ORDER, schema, ModelsNames.ORDER)

