import * as mongoose from 'mongoose'

mongoose.connect('mongodb://mongo:27017/plants')

export { default as User } from './User';
export { default as Order } from './Order'
export { default as File } from './File'
export { default as Status } from './Status'
export { default as Config } from './Config'
export default mongoose