import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js"; 
import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { User } from "../../modelsSchema/UserGeneric/userSchema.js";


export function GetFirmRegister(req, res)
 { 
    res.sendFile( 'D:/DDU/SEM5/MERN/LawSphere/LawSphere/backend/HTMLforms/LawfirmForm.html' ); 
 } 

 export async function addFirm(req, res) 
 { 
    try { 
        console.log("Controller")
        console.log(req.body)

        let firm = new Lawfirm(req.body); 
        await firm.save(); 
        res.status(200).json(firm); 
    } 
    catch (error) 
    { 
        console.log("Error while adding law firm:", error); 

        res.status(500).json({ message: "Failed to add law firm", error: error.message }); 
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