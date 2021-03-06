import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

const FETCH = 'FETCH'
const FETCH_SESSION = 'FETCH_SESSION'
const RECEIVE = 'RECEIVE'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createLogger()],
    state:{
        user:null,
        init:false,
        isFetching:false
    },
    getters: {
        getUser: store => store.user,
        init: store => store.init
    },
    actions:{
        fetchUser({commit},input){
            commit(FETCH)
            setTimeout(()=>{
                commit(RECEIVE,input)
            },1000)
        },
        session({commit}){
            commit(FETCH_SESSION)
            setTimeout(()=>{
                commit(RECEIVE,{name:'Jose', admin:true})
            },1000)
        }
    },
    mutations:{
        [FETCH](state){
            state.isFetching = true
        },
        [FETCH_SESSION](state){
            state.isFetching = true
        },
  
        [RECEIVE](state,data){
            state.init = true
            state.isFetching = false
            state.user = data
        }

    }
})