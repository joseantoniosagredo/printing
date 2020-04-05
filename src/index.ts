import * as express from 'express'
import routerApiRest from './routers/apiRest'
import apiRouter from './routers/api'
import fileRoute from './routers/file'
import mongoose from './models'
import * as session from 'express-session'
import { SessionOptions } from 'express-session'

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
app.use(session(options))
app.get('/', (req, res) => res.send('Hello Word'))
app.use('/api',fileRoute)
app.use('/api', apiRouter)
app.use('/api/rest', routerApiRest)
app.use('/api/rest', routerApiRest.publishUiTree())
app.listen(80, () => {
    console.log('Start aplication')
})