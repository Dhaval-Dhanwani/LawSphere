import mongo from 'mongoose'

let jobPostingSchema = mongo.Schema(
    {
        lawfirmId: {
            type: mongo.Schema.Types.ObjectId,
            ref: "Lawfirm",
            default: null
        },
        firmName: {
            type: String,
            default: ""
        },
        jobTitle: {
            type: String,
            required: true
        },
        practiceArea: {
            type: String,
            required: true
        },
        experienceRequired: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        jobType: {  
            type: String,
            enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        scheduledDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["Draft", "Active", "Closed"],
            default: "Active"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)


let JobPosting = mongo.model("JobPosting", jobPostingSchema);

export { JobPosting }

