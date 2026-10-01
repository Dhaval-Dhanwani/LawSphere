import mongo from 'mongoose'

let jobApplicationSchema = mongo.Schema(
    {
        applicationDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ["Applied", "Reviewed", "Shortlisted", "Interview", "Selected", "Rejected", "Withdrawn"],
            default: "Applied"
        }
    }
)

let JobApplication = mongo.model("JobApplication", jobApplicationSchema);

export { JobApplication }
