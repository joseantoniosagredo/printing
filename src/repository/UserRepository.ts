import { Callback } from "../utils";
import User, { UserType } from "../models/User";
import { Document } from "mongoose";

export function findUserByEmail(email:string,callback:Callback<UserType & Document>){
    User.findOne({email},callback)
}