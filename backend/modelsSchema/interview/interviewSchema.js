import mongo from 'mongoose'

let interviewSchema = mongo.Schema(
    {
        interviewDate: {
            type: Date,
            required: true
        },
        interviewTime: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            enum: ["Online", "Offline"],
            required: true
        },
        meetingDetails: {
            type: String
        },
        result: {
            type: String,
            enum: ["Pending", "Selected", "Rejected", "Further Review"],
            default: "Pending"
        },
        notes: {
            type: String
        }
    }
)

let Interview = mongo.model("Interview", interviewSchema);

export { Interview }
