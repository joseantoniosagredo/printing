import { User, Order, Token } from '../models';
import { Router } from 'express';
import { TokenType } from '../models/Token'
import * as bcrypt from 'bcrypt'
import { welcomeEmail,ChangePassword } from '../mailer';
import { Callback } from '../utils';
import { findUserByEmail } from '../repository/UserRepository';

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
        if (!user.verified) return res.sendStatus(403)
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
    const { admin, password, ...user } = req.body
    if (!password) return res.status(400).send('Password is needed')
    bcrypt.hash(password, 10).then(newPassword => {
        const userdb = new User({ ...user, password: newPassword })
        userdb.save(err => {
            if (err) return res.status(500).send(err.message)
            welcomeEmail(userdb, err => {
                if (err) return res.status(500).send(err.message)
                res.send()
            })

        })
    }).catch(err => res.status(500).send(err.message))

})
route.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send(err.message)
        res.send()
    })
})
route.get('/register/token/:id', (req, res) => {
    let id = req.params.id
    Token.findById(id, (err, token) => {
        if (err) return res.sendStatus(500)
        if (!token) return res.sendStatus(400)
        if (token.type !== 'signup') return res.sendStatus(403)
        if (token.expiredAt.getTime() > Date.now()) return res.sendStatus(403)
        User.findById(token.user, (err, user) => {
            if (err) return res.sendStatus(500)
            user.verified = true
            user.save(err => {
                if (err) return res.sendStatus(500)
                res.send()
            })
        })
    })

})
route.post('/password/token', (req, res) => {
    let id = req.body.token
    let password = req.body.password
    let user = req.body.user
    Token.findById(id, (err, token) => {
        const cancelToken = () => {
            token.canceled = true
            token.save(err => {
                if (err) return res.status(500).send(err)
                res.sendStatus(403)
            })
        }
        if (err) return res.sendStatus(500)
        if (!token) return res.sendStatus(400)
        if (token.type !== 'resetPassword') return cancelToken()
        if (token.user.toString() !== user) return cancelToken()
        if (token.expiredAt.getTime() > Date.now()) return res.sendStatus(403)
        User.findById(token.user, (err, user) => {
            if (err) return res.sendStatus(500)
            bcrypt.hash(password, 10).then(newPassword => {
                user.password = newPassword
                user.save(err => {
                    if (err) return res.sendStatus(500)
                    res.send()
                })
            })

        })
    })

})
route.post('/password/reset',(req,res)=>{
    let user = req.body.user
    findUserByEmail(user,(err,userdb)=>{
        if(err) return res.sendStatus(500)
        if(!userdb) return res.sendStatus(200)
        ChangePassword(userdb,err => {
            if(err) return res.sendStatus(500)
            res.sendStatus(200)
        })
    })
})
export default route