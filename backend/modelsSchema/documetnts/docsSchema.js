import mongo from 'mongoose'


let docsRecord=mongo.Schema({
   
    documentName:
    {
        type:String ,
        required:true
    },
    status:{
        type:
        {
            type:String,
            required:true
        },
        enum:["Pending","Received"]
    }
})

let OneDocument=mongo.model("Document",docsRecord)

export {OneDocument}