import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import login from './login'
//import config from './config'
//import status from './status'
//import orders from './orders'
import generateApiStore from './generateApiStore'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createLogger()],
    modules: {
        config: generateApiStore({ name: 'CONFIG', url: '/api/rest/config', modifiedRequest: data => data.results[0] }, 'config'),
        login,
        status: generateApiStore({ name: 'STATUS', url: '/api/rest/status', modifiedRequest: data => data.results, isArray: true }, 'status'),
        orders: generateApiStore({ name: 'STATUS', url: '/api/order', modifiedRequest: data => data, isArray: true }, 'orders'),
    }
})