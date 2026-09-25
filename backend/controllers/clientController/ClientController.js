import {Client} from '../../modelsSchema/client/clientScehma.js'
import { Lawfirm } from '../../modelsSchema/lawfirm/lawfirmSchema.js'
import { Lawyer } from '../../modelsSchema/lawyer/lawyerSchema.js'
import { User } from '../../modelsSchema/UserGeneric/userSchema.js'

//use the library named zod/joi for adding validation


export let getRegisterForm= (req,res)=>
{
    // use the path.resolve()
    res.sendFile("D:/DDU/SEM5/MERN/LawSphere/LawSphere/backend/HTMLForms/clientForm.html")
}


// try-catch  prevent the server shut down
export let addClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(200).json(client);
    } catch (error) {
        console.error("Error saving client:", error);
        res.status(404).json({ error: error.message });
    }
}


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

