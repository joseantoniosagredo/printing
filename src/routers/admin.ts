import { Router,Request } from 'express';
import { getOrderFiltered } from '../repository/OrderRepository';
const route = Router()

route.get('/order', (req, res) => {
    let status:any = req.query.status
    let user:any = req.query.user
    let page:any = req.query.page ? req.query.page : 1
    let pageSize:any = req.query.pageSize ? req.query.pageSize : 50
    if (Array.isArray(status) || Array.isArray(user) || Array.isArray(page) || Array.isArray(pageSize))
        return res.status(400).send()
    page = parseInt(page)
    pageSize = parseInt(pageSize)
    if (isNaN(page) || isNaN(pageSize)) return res.status(400).send('Page or page size is not a number')
    getOrderFiltered({ user, status }, { page, pageSize }, (err, data) => {
        if (err) return res.status(500).send(err.message)
        res.send(data)
    })
})


export default route