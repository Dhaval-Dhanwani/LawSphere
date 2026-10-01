import mongo from 'mongoose'

let jobPostingSchema = mongo.Schema(
    {
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
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Draft", "Active", "Closed"],
            default: "Draft"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

let JobPosting = mongo.model("JobPosting", jobPostingSchema);

export { JobPosting }
