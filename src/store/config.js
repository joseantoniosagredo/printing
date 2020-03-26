
const FETCH = 'FETCH_CONFIG'
const RECEIVE = 'RECEIVE_CONFIG'

export default {
    state:{
        config:{},
        isFetching:false,
        invalidate:true
    },
    getters: {
        config: store => store.config,
    },
    actions:{
        fetchConfig({commit,state}){
            if(!state.invalidate) return 
            commit(FETCH)
            setTimeout(()=>{
                commit(RECEIVE,{
                    ["Number of copies"]:'number',
                    ["When sould be done?"]:'date',
                    ["Mode"]:['Doble cara','1 Cara']
                })
            },1000)
        }
    },
    mutations:{
        [FETCH](state){
            state.isFetching = true
            state.invalidate = false
        },
        [RECEIVE](state,data){
            state.isFetching = false
            state.config = data
        }

    }
}