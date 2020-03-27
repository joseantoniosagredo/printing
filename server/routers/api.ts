import { User, Order } from '../models';
import { Router } from 'express';
import { Types } from 'mongoose';
const route = Router()

route.get('/order',(req,res)=>{
    const id = req.params.id
    
})


export default route