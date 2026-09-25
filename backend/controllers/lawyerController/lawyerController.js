import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js";
export function getLawyerRegister(req,res)

{
    res.sendFile("D:/DDU/SEM5/MERN/LawSphere/LawSphere/backend/HTMLforms/lawyerForm.html")
}

export let addLawyer = async (req, res) => {
    try {
        const lawyer = new Lawyer(req.body);
        await lawyer.save();
        res.status(200).json(lawyer);
    } catch (error) {
        console.error("Error saving lawyer:", error);
        res.status(500).json({ error: error.message });
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