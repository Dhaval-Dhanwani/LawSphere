import mongo from "mongoose";

let userSchema=mongo.Schema({
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
   
},
{
    timestamps:true
}
)

let User= mongo.model("User",userSchema)

export {User};