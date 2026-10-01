import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js"; 
import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { setsession } from "../SignUpController/SignUp.js";

export function GetFirmRegister(req, res) { 
    res.sendFile('D:/DDU/SEM5/MERN/LawSphere/LawSphere/backend/HTMLforms/LawfirmForm.html'); 
} 

export async function addFirm(req, res) { 
    try { 
        console.log("Controller adding firm:", req.body);

        let firm = new Lawfirm(req.body); 
        await firm.save(); 

        setsession(req, firm, "Lawfirm");
        res.status(200).json(firm); 
    } catch (error) { 
        console.log("Error while adding law firm:", error); 
        res.status(400).json({ message: "Failed to add law firm", error: error.message }); 
    } 
}

export async function ListLawyers(req, res) {
    try {
        let Lawyers = await Lawyer.find({}).lean();
        return res.status(200).json(Lawyers);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function getProfile(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: "Unauthorized: No active session found" });
        }
        const { id } = req.session.user;
        const firm = await Lawfirm.findById(id).select("-password").lean();
        if (!firm) {
            return res.status(404).json({ error: "Law firm not found" });
        }
        return res.status(200).json(firm);
    } catch (error) {
        console.error("Error fetching law firm profile:", error);
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
        if (updateData.description !== undefined && updateData.desription === undefined) {
            updateData.desription = updateData.description;
        }
        if (updateData.practiceAreas !== undefined && updateData.practicesAreas === undefined) {
            updateData.practicesAreas = updateData.practiceAreas;
        }

        const updatedFirm = await Lawfirm.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password").lean();

        if (!updatedFirm) {
            return res.status(404).json({ error: "Law firm not found" });
        }
        return res.status(200).json({ message: "Law firm profile updated successfully", user: updatedFirm });
    } catch (error) {
        console.error("Error updating law firm profile:", error);
        return res.status(500).json({ error: error.message || "Failed to update profile" });
    }
}