import mongo from 'mongoose'

let lawfirmSchema=mongo.Schema(
    { 
        firmName:
        {
            type:String,
            required:true
        },
        desription:
        {
            type:String,
            required:true
        },
        practicesAreas:
        {
            type:String,
            required:true
        },
        officeLocations:
        {
            type:String,
            required:true
        },
        website:
        {
            type:String,
            required:true
        },
        contactEmail:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        },
        vertficationsStatus:
        {
            type:String,
            enum:["Pending","Verified","Rejected"],
            default:"Verified"
        }

    }
)

let Lawfirm=mongo.model("Lawfirm",lawfirmSchema)

export {Lawfirm}
