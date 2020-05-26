
import axios from "axios"

export function postOrder(order, callback) {
    axios.post('/api/order', order, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        callback(null)
    }).catch(callback)

}

export function patchOrder(id, order, callback) {
    axios.patch('/api/admin/order/' + id, order, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        callback(null)
    }).catch(callback)

}
export function closeOrder(id, callback) {
    axios.get('/api/admin/order/close/' + id).then(() => {
        callback(null)
    }).catch(callback)

}

export function pageOf(order, callback) {
    axios.post('/api/pagesof', order, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.status === 200)
            return callback(null, response.data)
        callback(new Error(response.statusText))
    }).catch(callback)

}
export function createUser(user, callback) {
    axios.post('/api/register', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 200)
            return callback(null, response.data)
        callback(new Error(response.statusText))
    }).catch(callback)
}
export function login(username, password, callback) {
    axios.get('/api/login', {
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }
    }).then((response) => {
        if (response.status === 200)
            return callback(null, response.data)
        callback(new Error(response.statusText))
    }).catch(callback)
}
export function logout(callback) {
    axios.get('/api/logout').then((response) => {
        if (response.status === 200)
            return callback(null)
        callback(new Error(response.statusText))
    }).catch(callback)
}

export function changePassword(user,token,password,callback) {
    axios.post('/api/password/token',{user,token,password}).then((response) => {
        if (response.status === 200)
            return callback(null)
        callback(new Error(response.statusText))
    }).catch(callback)
}
export function resetPassword(user,callback) {
    axios.post('/api/password/reset',{user}).then((response) => {
        if (response.status === 200)
            return callback(null)
        callback(new Error(response.statusText))
    }).catch(callback)
}

export function verifyUser(token,callback) {
    axios.get('/api/register/token/'+token).then((response) => {
        if (response.status === 200)
            return callback(null)
        callback(new Error(response.statusText))
    }).catch(callback)
}