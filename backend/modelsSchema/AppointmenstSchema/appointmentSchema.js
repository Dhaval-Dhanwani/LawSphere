import mongo from "mongoose";

    let appointmentSchema = mongo.Schema({

    clientId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Clients", // reference the clients
        required: true
    },

    lawyerId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Lawyer",   // reference the lawyersx
        default: null
    },

    lawfirmId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Lawfirm",  // reference the lawfirm
        default: null
    },

    date: {
        type: Date,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    requestStatus: {
        type: String,
        enum: ["Not Seen", "Pending", "Accepted", "Rejected","Cancelled"],
        default: "Not Seen"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

export let AppointmentModel=mongo.model("Appointments",appointmentSchema)

