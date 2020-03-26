
const FETCH = 'FETCH_ORDER'
const RECEIVE = 'RECEIVE_ORDER'

//HARDCODE
var count = 1
const createOrder = ()=>{
    count++
    return {
        _id: count,
        user: {
          name: "Jose Antonio",
          phone: (Math.random()*1000000000).toFixed(0),
          email: "asdfas@asdf.es"
        },
        file: "/api/file/1",
        fileName: "CV_Jose.pdf",
        pages: 10,
        status: {
          _id: (Math.random()*3 + 1).toFixed(0),
          name: "Hecho",
          acctionNeeded: false
        },
        closed: Math.random()>0.5,
        date:new Date(),
        options: {
          'Mode': 'Doble page'
        }
      }
}

export default {
    state:{
        orders:[],
        isFetching:false,
        invalidate:true
    },
    getters: {
        orders: store => store.orders,
    },
    actions:{
        fetchOrders({commit,state}){
            if(!state.invalidate) return 
            commit(FETCH)
            setTimeout(()=>{
                commit(RECEIVE,[createOrder(),createOrder(),createOrder()])
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
            state.orders = data
        }

    }
}