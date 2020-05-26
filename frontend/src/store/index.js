import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import login from './login'
import {REMOVE} from './login'

import lang from './lang'
//import config from './config'
//import status from './status'
//import orders from './orders'
import generateApiStore from './generateApiStore'
import {logout} from '../Api'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createLogger()],
    modules: {
        config: generateApiStore({ name: 'CONFIG', url: '/api/rest/config', modifiedRequest: data => data.results[0] }),
        login,
        status: generateApiStore({ name: 'STATUS', url: '/api/rest/status', modifiedRequest: data => data.results, isArray: true }),
        order: generateApiStore({ name: 'ORDER', url: '/api/order', isArray: true }),
        adminOrder: generateApiStore({ name: 'adminOrder', url: '/api/admin/order'}),
        lang
    },
    actions:{
        logout({commit}){
            logout((err)=>{
                if(err) return console.error(err)
                commit(REMOVE)
                commit('config/invalidateAll')
                commit('status/invalidateAll')
                commit('order/invalidateAll')
                commit('adminOrder/invalidateAll')
            })
        }
    }
})