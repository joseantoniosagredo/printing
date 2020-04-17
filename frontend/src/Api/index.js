
import axios from "axios"

export function postOrder(order,callback){
    axios.post('/api/order',order,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }).then(()=>{
        callback(null)
    }).catch(callback)

}
export function pageOf(order,callback){
    axios.post('/api/pagesof',order,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }).then((response)=>{
        if (response.status === 200) 
            return callback(null,response.data)
        callback(new Error(response.statusText))
    }).catch(callback)

}
export function createUser(user,callback){
    axios.post('/api/register',user,{
        headers: {
            'Content-Type': 'application/json'
        }
      }).then((response)=>{
        if (response.status === 200) 
            return callback(null,response.data)
        callback(new Error(response.statusText))
    }).catch(callback)
}
export function login(username,password,callback){
    axios.get('/api/login',{
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }
      }).then((response)=>{
        if (response.status === 200) 
            return callback(null,response.data)
        callback(new Error(response.statusText))
    }).catch(callback)
}