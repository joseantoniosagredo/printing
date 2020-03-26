import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import login from './login'
import config from './config'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createLogger()],
    modules:{
        config,
        login,
    }
})