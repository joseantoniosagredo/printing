import * as express from 'express'
import routerApiRest from './routers/apiRest'
import apiRouter from './routers/api'
import fileRoute from './routers/file'
import adminRouter from './routers/admin'
import loginRoute from './routers/login'
import mongoose from './models'
import * as session from 'express-session'
import { SessionOptions } from 'express-session'
import * as bodyParse from 'body-parser'
var path = require('path')
const app = express()
const MongoStore = require('connect-mongo')(session);
var options: SessionOptions = {
    secret: 'foo',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(bodyParse.json())
app.use(session(options))
app.use('/api', loginRoute)
app.use((req,res,next)=>{
    if(req.session.user) return next()
    res.status(401).send('User not logged')
})
app.use('/api',fileRoute)
app.use('/api', apiRouter)
app.use('/api/admin',adminRouter)
app.use('/api/rest', routerApiRest)
app.use('/api/rest', routerApiRest.publishUiTree())
app.listen(80, () => {
    console.log('Start aplication')
})