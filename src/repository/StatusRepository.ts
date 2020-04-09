import Status, { StatusDocumentType } from "../models/Status"

export function getDefaultStatus(cb:(err:Error|null,status:StatusDocumentType)=>void){
    Status.findOne({default:true},cb)
}