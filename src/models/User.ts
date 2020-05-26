import { Document, Schema, model, HookAsyncCallback, Model } from 'mongoose'
import { ModelsNames } from './enums';
import HttpError from '../utils';
import * as bcrypt from 'bcrypt'
export type UserType = {
  email: string,
  name: string,
  phone: number,
  admin: boolean
  password: string
  verified: Boolean
}

const schema = new Schema({
  email: { type: String, required: true, unique: true, validate: (email: string) => email == email.toLowerCase() },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  admin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
})
schema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}
function validateUser({ email, password }: { email: string, password: string }, callback: (err: HttpError | null, user?: UserType & Document) => void) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(new HttpError(err))
      } else if (!user) {
        var error = new HttpError('User not found.', 401);
        return callback(error);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback(new HttpError('Unauthorized', 401));
        }
      })
    });
}
schema.statics.validateUser = validateUser

type StaticUserMethod = {
  validateUser: typeof validateUser
} & Model<UserType & Document, {}>

const User = model<UserType & Document, StaticUserMethod>(ModelsNames.USER, schema, ModelsNames.USER)
export default User