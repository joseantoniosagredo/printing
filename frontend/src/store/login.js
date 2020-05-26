
const FETCH = 'FETCH'
const FETCH_SESSION = 'FETCH_SESSION'
const ERROR_SESSION = 'ERROR_SESSION'
const RECEIVE = 'RECEIVE'

export const REMOVE = 'REMOVE_SESSION'
import axios from 'axios'
import { login } from '../Api'
function getInitState(){
    return {
        user:null,
        init:false,
        isFetching:false
    }
}
export default {
    state:getInitState(),
    getters: {
        getUser: store => store.user,
        init: store => store.init
    },
    actions:{
        fetchUser({commit},input,callback){
            commit(FETCH)
            login(input.username,input.password,(err,user)=>{
                if(err){
                    if(callback) callback(err)
                    return commit(ERROR_SESSION,err)
                } 
                commit(RECEIVE,user)
                if(callback) callback(null,user)
            })
        },
        session({commit}){
            commit(FETCH_SESSION)
            axios.get('/api/session').then(response => {
                commit(RECEIVE,response.data)
            }).catch(err => commit(ERROR_SESSION,err))
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
        },
        [ERROR_SESSION](state){
            state.isFetching = false
            state.init = true
            
        },
        [REMOVE](state){
            state.user=null
            state.init=true
            state.isFetching=false
        }

    }
}