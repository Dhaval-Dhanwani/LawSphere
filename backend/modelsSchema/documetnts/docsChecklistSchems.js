import mongo from 'mongoose'

let docslistSchema=mongo.Schema(
    {
       
        matterName:
        {
            type:String,
            required:true
        },
        createAt: { type: Date, default: Date.now },
        status:{
            type:String,
            enum:["Active","Completed"]
        }
    }
)

let docslist=mongo.model("DocumentCheckList",docslistSchema);


export {docslist}
