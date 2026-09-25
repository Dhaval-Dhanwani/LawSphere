import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js";
import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { Client } from "../../modelsSchema/client/clientScehma.js";

export let Authicate = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Email, password, and role are required" });
        }

        const normalizedRole = role.trim().toLowerCase();

        if (normalizedRole === "clients" || normalizedRole === "client") {
            const client = await Client.findOne({ email: email.trim() }).lean();
            if (client && client.password === password) {
                return res.status(200).json({ message: "Authentication successful", role: "Clients", user: client });
            }
        } else if (normalizedRole === "lawyer") {
            const lawyer = await Lawyer.findOne({ email: email.trim() }).lean();
            if (lawyer && lawyer.password === password) {
                return res.status(200).json({ message: "Authentication successful", role: "Lawyer", user: lawyer });
            }
        } else if (normalizedRole === "lawfirm") {
            const lawfirm = await Lawfirm.findOne( { email: email.trim()}).lean();
            if (lawfirm && lawfirm.password === password) {
                return res.status(200).json({ message: "Authentication successful", role: "Lawfirm", user: lawfirm });
            }
        }

        return res.status(401).json({ error: "Invalid email, password, or role" });
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};