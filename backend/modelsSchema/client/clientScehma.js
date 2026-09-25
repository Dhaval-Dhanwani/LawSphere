import mongo from "mongoose";
import {User} from "../UserGeneric/userSchema.js";

let clientSchma =mongo.Schema({
   
    name: {
        type:String,
        required:true,
    },
    age:
    {
        type:String,
        required:true,
    },
    contact:
    {
        type:String,
        required:true,
        unique: true
    },
    email:
    {
        type:String,
        required:true, 
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    accountStatus:{
        type :String,
        enum:["Active","Inactive"],
        default:"Active"
    },
   
    address:{
        type:String,
        required:true
    }
})

// let client=mongo.mongo("Client",clientSchma)

let Client=mongo.model("Clients",clientSchma);

export {Client}