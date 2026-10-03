import { AppointmentModel } from "../../modelsSchema/AppointmenstSchema/appointmentSchema.js";
import { Client } from "../../modelsSchema/client/clientScehma.js";
import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js";

// Helper to delete appointments after their scheduled date has passed
export const cleanupExpiredAppointments = async () => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        await AppointmentModel.deleteMany({ date: { $lt: todayStart } });
    } catch (err) {
        console.error("Error cleaning up expired appointments:", err);
    }
};

export let GetClientAppointments = async (req, res) => {
    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }

        // Automatic deletion of appointments past scheduled date
        await cleanupExpiredAppointments();

        let ListAppointment = await AppointmentModel.find({ clientId: req.session.user.id })
            .populate('lawyerId', 'name email contact Location praticeAreas experience')
            .populate('lawfirmId', 'firmName contactEmail officeLocations practicesAreas')
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json(ListAppointment || []);
    } catch (error) {
        console.error("Error in GetClientAppointments:", error);
        return res.status(500).json({ error: "Server error fetching client appointments" });
    }
};

export let GetLawyerAppointments = async (req, res) => {
    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }

        // Automatic deletion of appointments past scheduled date
        await cleanupExpiredAppointments();

        let ListAppointment = await AppointmentModel.find({ lawyerId: req.session.user.id })
            .populate('clientId', 'name email contact address')
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json(ListAppointment || []);
    } catch (error) {
        console.error("Error in GetLawyerAppointments:", error);
        return res.status(500).json({ error: "Server error fetching lawyer appointments" });
    }
};

export let GetLawfirmAppointments = async (req, res) => {
    try {
        if (!req.session || !req.session.user || !req.session.user.id) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }

        // Automatic deletion of appointments past scheduled date
        await cleanupExpiredAppointments();

        let ListAppointment = await AppointmentModel.find({ lawfirmId: req.session.user.id })
            .populate('clientId', 'name email contact address')
            .populate('lawyerId', 'name email contact')
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json(ListAppointment || []);
    } catch (error) {
        console.error("Error in GetLawfirmAppointments:", error);
        return res.status(500).json({ error: "Server error fetching law firm appointments" });
    }
};

export let ChangeStatus = async (ListAppointments) => {
    await Promise.all(ListAppointments.map(async (appointment) => {
        if (appointment.requestStatus === "Not Seen") {
            appointment.requestStatus = "Pending";
            await appointment.save();
        }
    }));
};