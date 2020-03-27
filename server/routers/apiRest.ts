import { ApiRouter } from 'mongoose-restapi-ui'
import { User, Order } from '../models';
const route = ApiRouter()

route.setGlobalRoute('/api/rest')
route.setModel('/user', User)
route.setModel('/order', Order)

export default route