import mongo from 'mongoose'

let connectionRequestSchema = mongo.Schema(
    {
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
           // enum: ["Legal Service", "Professional Collaboration", "Case Referral", "Recruitment", "Other"]
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", "Closed"],
            default: "Pending"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

let ConnectionRequest = mongo.model("ConnectionRequest", connectionRequestSchema);

export { ConnectionRequest }
