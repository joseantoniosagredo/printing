import { User, Order } from '../models';
import { Router } from 'express';

import * as bcrypt from 'bcrypt'

const route = Router()

route.get('/login', (req, res) => {
    const id = req.params.id
    const auth = req.headers['authorization']
    if (!auth) return res.status(400).send('Auth header is requred')
    if (!auth.startsWith('Basic ')) res.status(400).send('Use Basic auth')
    const basicAuth = (new Buffer(auth.slice(6), 'base64')).toString()
    const [email, ...passwordArray] = basicAuth.split(':')
    const password = passwordArray.join(':')
    User.validateUser({ email, password }, (err, user) => {
        if (err) return res.status(err.status).send(err.message)
        req.session.user = user.id
        req.session.save(err => {
            if (err) return res.status(500).send(err.message)
            res.send(user.toJSON())    
        })
        
    })
})
route.get('/session', (req, res) => {
    const id = req.session.user
    if (!id) return res.status(404).send()
    User.findById(id, (err, user) => {
        if (err) return res.status(500).send(err.message)
        res.send(user.toJSON())
    })
})
route.post('/register', (req, res) => {
    const { admin,password, ...user } = req.body
    if(!password) return res.status(400).send('Password is needed')  
    bcrypt.hash(password,10).then(newPassword=>{
        const userdb = new User({...user,password:newPassword})
        userdb.save(err => {
            if (err) return res.status(500).send(err.message)
            res.send()
        })    
    }).catch(err=> res.status(500).send(err.message))
    
})
route.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send(err.message)
        res.send()
    })
})
export default route