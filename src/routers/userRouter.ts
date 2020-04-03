import { Router, Request } from 'express'
import { Types } from 'mongoose'
import { User } from '../models'
import {BaseMemoryStore} from 'express-session'
const router = Router()
export type SessionRequest = {
    session: BaseMemoryStore &  {
        user: Types.ObjectId
    }
}
router.get('/session', (req: Request & SessionRequest, res) => {
    if (req.session.user)
        User.findById(req.session.user, (err, user) => {
            if(err) return res.status(500).send(err)
            if(!user){
                req.session.destroy((errorDestroy)=>{
                    if(errorDestroy) return res.status(500).send(err)
                    res.status(401).send('User in session not found')
                })
                res.send(user)
            } 
        })
    else 
        res.status(401).send()
})

router.get('/login',(req: Request & SessionRequest, res) => {
    const auto = req.header('Authorization')
    if(!auto) return res.status(400).send('Auth header has not sent')

})

export default router
