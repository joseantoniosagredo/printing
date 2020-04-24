import axios from "axios"
class HttpError extends Error {
    constructor(msg, error) {
        super(msg)
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
export default ({ name, url, headers, modifiedRequest, isArray, fetchAlways }) => {
    if (name === undefined) throw new Error('Name is required')
    if (url === undefined) throw new Error('URL is required')
    let isArrayInternal = isArray !== true ? false : true
    
    const FETCH = 'FETCH_' + name
    const RECEIVE = 'RECEIVE_' + name
    const INVALIDATE = 'INVALIDATE_' + name
    const ERROR = 'ERROR_' + name

    return {
        namespaced: true,
        state: {
            requests: {}
        },
        getters: {
            get: (state) => (queryString = '') => state.requests[queryString] && state.requests[queryString].result !== null ? state.requests[queryString].result : isArrayInternal ? [] : null,
            isFetching: state => (queryString = '') => state.requests[queryString] ? state.requests[queryString].fetching : false
        },
        actions: {
            fetch({ commit, state }, queryString = '') {
                if (state.requests[queryString] === undefined)
                    state.requests = Object.assign({}, state.requests, {
                        [queryString]: {
                            result: null,
                            isFetching: false,
                            invalidate: true
                        }
                    })
                if (!fetchAlways && !state.requests[queryString].invalidate) return state.requests[queryString].result
                commit(FETCH, { queryString })
                return axios.get(url + `?${queryString}`, {
                    headers
                }).then(response => {
                    if (response.status === 200) {
                        const result = modifiedRequest ? modifiedRequest(response.data) : response.data
                        commit(RECEIVE, { queryString, result })
                        return result
                    }
                    let err = new HttpError(response.data, response.status)
                    commit(ERROR, { queryString, err })
                    return Promise.reject(err)
                }).catch(err => {
                    commit(ERROR, { queryString, err })
                    return Promise.reject(err)
                })
            }
        },
        mutations: {
            [FETCH](state, { queryString }) {
                if (state.requests[queryString] === undefined)
                    state.requests = Object.assign({}, state.requests, {
                        [queryString]: {
                            result: null,
                            isFetching: false,
                            invalidate: true
                        }
                    })
                state.requests[queryString].isFetching = true
                state.requests[queryString].invalidate = false
            },
            [RECEIVE](state, { queryString, result }) {
                state.requests[queryString].isFetching = false
                state.requests[queryString].result = result
            },
            [INVALIDATE](state, { queryString }) {
                if (state.requests[queryString] === undefined)
                    state.requests = Object.assign({}, state.requests, {
                        [queryString]: {
                            result: null,
                            isFetching: false,
                            invalidate: true
                        }
                    })
                state.requests[queryString].isFetching = false
                state.requests[queryString].invalidate = true
            },
            [ERROR](state, { queryString, error }) {
                state.requests[queryString].error = error
                state.requests[queryString].isFetching = false
            }

        }
    }
}
