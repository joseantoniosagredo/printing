import { ApiRouter } from 'mongoose-restapi-ui'
import { User, Order,Status,Config,File } from '../models';
const route = ApiRouter()

route.setGlobalRoute('/api/rest')
route.setModel('/user', User)
route.setModel('/order', Order)
route.setModel('/status', Status)
route.setModel('/config', Config)

export default route