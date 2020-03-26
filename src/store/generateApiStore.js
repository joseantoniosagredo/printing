import axios from "axios"

class HttpError extends Error {
    constructor(msg, error) {
        this.message = msg
        this.error = error
    }
}

/**
 * @param {name, url, headers} 
 *      name: Name of the request
 *      url:
 *      
 * @param objectName If you want to change the output name
 * 
 * @returns
 *      actions:
 *          fetch
 *          invalidate
 * 
 * example:
 * name: Order
 * url:/api/order
 * objectName = orders
 * 
 * output: 
 *      map
 *      actions:
 *          fetchOrders: 
 */
export default ({ name, url, headers }, objectName) => {
    if (name === undefined) throw new Error('Name is required')
    if (url === undefined) throw new Error('URL is required')

    const nameUpperCase = name.toUpperCase()
    const nameLowerCase = objectName || name.toLowerCase()
    const nameFirstUp = nameLowerCase.charAt(0).toUpperCase() + nameLowerCase.slice(1);

    const FETCH = 'FETCH_' + nameUpperCase
    const RECEIVE = 'RECEIVE_' + nameUpperCase
    const INVALIDATE = 'INVALIDATE_' + nameUpperCase
    const ERROR = 'ERROR_' + nameUpperCase
    return {
        state: {
            [nameLowerCase]: [],
            isFetching: false,
            invalidate: true
        },
        getters: {
            [nameLowerCase]: store => store[nameLowerCase],
        },
        actions: {
            ['fetch' + nameFirstUp]({ commit, state }) {
                if (!state.invalidate) return
                commit(FETCH)
                axios.get({
                    url,
                    headers
                }).then(response => {
                    if (response.status === 200)
                        return commit(RECEIVE, JSON.parse(response.data))
                    return commit(ERROR, new HttpError(response.data, response.status))
                })
            }
        },
        mutations: {
            [FETCH](state) {
                state.isFetching = true
                state.invalidate = false
            },
            [RECEIVE](state, data) {
                state.isFetching = false
                state.orders = data
            },
            [INVALIDATE](state, data) {
                state.isFetching = false
                state.invalidate = true
            },
            [ERROR](state, error) {
                state.error = error
                state.isFetching = false
            }

        }
    }
}