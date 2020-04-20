import { User, Order } from '../models';
import { Router } from 'express';
import { Types } from 'mongoose';
import { getOrderByUser } from '../repository/OrderRepository';
const route = Router()

route.get('/order',(req,res)=>{
    let user = req.session.user
    if(!user) return res.status(401).send()
    getOrderByUser(user,(err,orders)=>{
        if(err) return res.status(500).send(err.message)
        res.send(orders)
    })
})


export default route