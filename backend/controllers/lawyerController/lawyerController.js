import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js";
import { setsession } from "../SignUpController/SignUp.js";

export function getLawyerRegister(req, res) {
    res.sendFile("D:/DDU/SEM5/MERN/LawSphere/LawSphere/backend/HTMLforms/lawyerForm.html");
}

export let addLawyer = async (req, res) => {
    try {
        const lawyer = new Lawyer(req.body);
        await lawyer.save();
        setsession(req, lawyer, "Lawyer");
        res.status(200).json(lawyer);
    } catch (error) {
        console.error("Error saving lawyer:", error);
        res.status(400).json({ error: error.message });
    }
};

export let listLawfirms = async (req, res) => {
    try {
        let Lawfirms = await Lawfirm.find({}).lean();
        return res.status(200).json(Lawfirms);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ error: "Server error" });
    }
};

export async function getProfile(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }
        const { id } = req.session.user;
        const lawyer = await Lawyer.findById(id).select("-password").lean();
        if (!lawyer) {
            return res.status(404).json({ error: "Lawyer not found" });
        }
        return res.status(200).json(lawyer);
    } catch (error) {
        console.error("Error fetching lawyer profile:", error);
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

        // Support matching schema field aliases
        if (updateData.location !== undefined && updateData.Location === undefined) {
            updateData.Location = updateData.location;
        }
        if (updateData.practiceAreas !== undefined && updateData.praticeAreas === undefined) {
            updateData.praticeAreas = updateData.practiceAreas;
        }

        const updatedLawyer = await Lawyer.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password").lean();

        if (!updatedLawyer) {
            return res.status(404).json({ error: "Lawyer not found" });
        }
        return res.status(200).json({ message: "Lawyer profile updated successfully", user: updatedLawyer });
    } catch (error) {
        console.error("Error updating lawyer profile:", error);
        return res.status(500).json({ error: error.message || "Failed to update profile" });
    }
}