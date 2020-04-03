
const FETCH = 'FETCH_STATUS'
const RECEIVE = 'RECEIVE_STATUS'

export default {
    state: {
        status: [],
        isFetching: false,
        invalidate: true
    },
    getters: {
        status: store => store.status,
    },
    actions: {
        fetchStatus({ commit, state }) {
            if (!state.invalidate) return
            commit(FETCH)
            setTimeout(() => {
                commit(RECEIVE, [{
                    _id: 1,
                    name: 'To do'
                }, {
                    _id: 2,
                    name: 'Doing'
                }, {
                    _id: 3,
                    name: 'Done'
                },
                {
                    _id: 4,
                    name: 'Delivered'
                }])
            }, 1000)
        }
    },
    mutations: {
        [FETCH](state) {
            state.isFetching = true
            state.invalidate = false
        },
        [RECEIVE](state, data) {
            state.isFetching = false
            state.status = data
        }

    }
}