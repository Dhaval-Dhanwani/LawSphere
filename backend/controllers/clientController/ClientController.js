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
