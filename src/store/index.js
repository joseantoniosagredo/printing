import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import login from './login'
import config from './config'
import status from './status'
import orders from './orders'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createLogger()],
    modules:{
        config,
        login,
        status,
        orders
    }
})