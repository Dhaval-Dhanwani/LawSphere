import mongo from 'mongoose'

let notificationSchema = mongo.Schema(
    {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["Connection", "Recruitment", "System", "Checklist", "Other"],
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

let Notification = mongo.model("Notification", notificationSchema);

export { Notification }
