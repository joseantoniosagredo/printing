import { Document, Schema, model, HookAsyncCallback, Model, Types } from 'mongoose'
import { ModelsNames } from './enums';
export type TokenType = {
  user: Types.ObjectId,
  expiredAt: Date,
  type: 'signup' | 'resetPassword',
  canceled: boolean
}

const schema = new Schema({
  user: { type: Types.ObjectId, required: true },
  expiredAt: { type: Date, required: true },
  type: { type: String, enum: ['signup', 'resetPassword'], required: true },
  canceled: { type: Boolean, required: true, default: false }
})
const Token = model<TokenType & Document>(ModelsNames.TOKEN, schema, ModelsNames.TOKEN)
export default Token