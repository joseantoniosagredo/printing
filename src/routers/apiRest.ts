import { ApiRouter } from 'mongoose-restapi-ui'
import { User, Order, Status, Config, File } from '../models';
import { removeFile } from '../repository/FileRepository';
const route = ApiRouter()

route.setGlobalRoute('/api/rest')
route.setModel('/user', User)
route.setModel('/order', Order, {
    hasDeletePermission: () => false
})
route.setModel('/status', Status)
route.setModel('/config', Config)
route.delete('/file/:id', (req, res) => {
    let id = req.params.id
    removeFile(id,err => {
        if(err) return res.status(err.status).send(err.message)
        res.send()
    })
})
route.setModel('/file', File, {
    hasDeletePermission: () => false
})
export default route