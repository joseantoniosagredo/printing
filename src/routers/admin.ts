import { Router } from 'express';
import { getOrderFiltered, closeOrder, patchOrder } from '../repository/OrderRepository';
import { Types } from 'mongoose';
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
route.get('/order/close/:id',(req,res)=>{
    let id = new Types.ObjectId(req.params.id)
    closeOrder(id,(err,order)=>{
        if(err) return res.status(err.status).send(err.message)
        res.send(order)
    })
})
route.patch('/order/:id',(req,res)=>{
    let id = Types.ObjectId(req.params.id)
    patchOrder(id,req.body,(err,order)=>{
        if (err) return res.status(500).send(err.message)
        res.send(order)
    })
})

export default route