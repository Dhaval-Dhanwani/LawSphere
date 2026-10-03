import { AppointmentModel } from '../../modelsSchema/AppointmenstSchema/appointmentSchema.js';
import { Client } from '../../modelsSchema/client/clientScehma.js';
import { Lawfirm } from '../../modelsSchema/lawfirm/lawfirmSchema.js';
import { Lawyer } from '../../modelsSchema/lawyer/lawyerSchema.js';
import { setsession } from '../SignUpController/SignUp.js';

export let getRegisterForm = (req, res) => {
    res.sendFile("D:/DDU/SEM5/MERN/LawSphere/LawSphere/backend/HTMLForms/clientForm.html");
};

export let addClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        setsession(req, client, "Clients");
        res.status(200).json(client);
    } catch (error) {
        console.error("Error saving client:", error);
        res.status(400).json({ error: error.message });
    }
};

export let ListLawyers = async (req, res) => {
    try {
        let LawyerDocs = await Lawyer.find({}).lean();
        return res.status(200).json(LawyerDocs);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ error: "Server error" });
    }
};

export let ListLawfirms = async (req, res) => {
    try {
        let Lawfirms = await Lawfirm.find({}).lean();
        return res.status(200).json(Lawfirms);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ error: "Server error" });
    }
};

export async function Profile(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }
        const { id } = req.session.user;
        const client = await Client.findById(id).select("-password").lean();
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        return res.status(200).json(client);
    } catch (error) {
        console.error("Error fetching client profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateProfile(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }
        const { id } = req.session.user;
        const updateData = { ...req.body };
        delete updateData.password;
        delete updateData._id;

        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password").lean();

        if (!updatedClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        return res.status(200).json({ message: "Client profile updated successfully", user: updatedClient });
    } catch (error) {
        console.error("Error updating client profile:", error);
        return res.status(500).json({ error: error.message || "Failed to update profile" });
    }
}



export async function MakeAppointment(req, res) {
    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ error: "Unauthorized: Please log in as a client first" });
        }

        let { date, message, lawyerId, lawfirmId } = req.body;
        let clientId = req.session.user.id;

        if (!date || !message) {
            return res.status(400).json({ error: "Preferred date and purpose/note are required" });
        }

        const appointmentDate = new Date(date);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        if (isNaN(appointmentDate.getTime()) || appointmentDate < todayStart) {
            return res.status(400).json({
                error: "Please check and choose a future date. Appointments cannot be scheduled for past dates."
            });
        }

        if (!lawyerId && !lawfirmId) {
            return res.status(400).json({ error: "Practitioner ID (lawyer or law firm) is required" });
        }


        let resolvedLawfirmId = lawfirmId || null;

        if (lawyerId) {
            let lawyer = await Lawyer.findById(lawyerId);
            if (!lawyer) {
                return res.status(404).json({ error: "Lawyer not found" });
            }
            if (lawyer.lawfirmId) {
                resolvedLawfirmId = lawyer.lawfirmId;
            }
        } else if (lawfirmId) {
            let lawfirm = await Lawfirm.findById(lawfirmId);
            if (!lawfirm) {
                return res.status(404).json({ error: "Law firm not found" });
            }
        }

        let newAppointment = new AppointmentModel({
            clientId: clientId,
            lawyerId: lawyerId || null,
            lawfirmId: resolvedLawfirmId,
            date: date,
            message: message,
            requestStatus: "Not Seen"
        });

        await newAppointment.save();
        return res.status(201).json(newAppointment);

    } catch (error) {
        console.error("Error in MakeAppointment:", error);
        return res.status(500).json({ error: error.message || "Server error while creating appointment" });
    }
}

export let CancelAppointment = async (req, res) => {
    try {
        const { appointId } = req.body;

        if (!appointId) {
            return res.status(400).json({ error: "Appointment ID is required" });
        }

        let needtoCancel = await AppointmentModel.findById(appointId);

        if (!needtoCancel) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        needtoCancel.requestStatus = "Cancelled";
        await needtoCancel.save();

        return res.status(200).json(needtoCancel);

    } catch (error) {
        console.error("Error in CancelAppointment:", error);
        return res.status(500).json({ error: "Server Error Try after sometime" });
    }
};