import mongo from 'mongoose';

let lawyerSchema=mongo.Schema(
    {
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
        education:
        {
            type:String,
            required:true
        },
        barCouncilNumber:
        {
            type:String,
            required:true
        },
        praticeAreas:
        {
            type:String,
            
        },
        Location:
        {
            type:String,
        },
        experience:
        {
            type:String,
        },
        skills:
        {
            type:String,
            
        },
        languages:
        {
            type:String,
            required:true
        },
        certifications:
        {
            type:String
        },
        previousFirms:
        {
            type:String,
            default:"Nothing"
        },
        achievements:
        {
            type:String,
            default:"Nothing"    
        },
        publications:
        {
            type:String,
            default:"Nothing"  
        },
        awards:
        {
            type:String,
            default:"Nothing"
        },
        vertificationStatus:
        {
            type:String,
            enum:["Pending","Verified","Rejected"],
            default:"Verified"
        }
    }
)


//let Lawyer=User.discriminator("Lawyer",lawyerSchema);
//mongo.model is use to make the separate table in database
let Lawyer=mongo.model("Lawyer",lawyerSchema);

export {Lawyer}