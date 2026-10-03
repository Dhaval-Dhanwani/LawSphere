import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js"; 
import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { setsession } from "../SignUpController/SignUp.js";
import { JobPosting } from "../../modelsSchema/jobPosting/jobPostingSchema.js";
import { AppointmentModel } from "../../modelsSchema/AppointmenstSchema/appointmentSchema.js";

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

// Automatically delete expired jobs after their scheduled date has passed
export const cleanupExpiredJobs = async () => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        await JobPosting.deleteMany({ scheduledDate: { $lt: todayStart } });
    } catch (err) {
        console.error("Error cleaning up expired jobs:", err);
    }
};

// Accept and Reject appointment requests for Law Firm
export let UpdateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, requestStatus } = req.body;

        if (!appointmentId || !requestStatus) {
            return res.status(400).json({
                error: "Appointment ID and status are required"
            });
        }

        if (
            requestStatus !== "Accepted" &&
            requestStatus !== "Rejected"
        ) {
            return res.status(400).json({
                error: "Invalid appointment status"
            });
        }

        const appointment = await AppointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                error: "Appointment not found"
            });
        }

        appointment.requestStatus = requestStatus;
        await appointment.save();

        return res.status(200).json(appointment);
    } catch (error) {
        console.error("Error updating lawfirm appointment status:", error);
        return res.status(500).json({
            error: "Server Error"
        });
    }
};

// Create job posting - restricted to role: Lawfirm
export async function CreateJobPosting(req, res) {
    try {
        // Enforce role restriction
        if (!req.session || !req.session.user || req.session.user.role?.toLowerCase() !== 'lawfirm') {
            return res.status(403).json({
                error: "Access Denied: Only users with the role 'Lawfirm' can post jobs."
            });
        }

        const {
            jobTitle,
            practiceArea,
            experienceRequired,
            location,
            jobType,
            description,
            scheduledDate,
            deadline,
            status
        } = req.body;

        const effectiveDate = scheduledDate || deadline;

        if (!jobTitle || !practiceArea || !experienceRequired || !location || !jobType || !description || !effectiveDate) {
            return res.status(400).json({
                error: "All required job posting fields and scheduled date must be provided."
            });
        }

        const jobDate = new Date(effectiveDate);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        if (isNaN(jobDate.getTime()) || jobDate < todayStart) {
            return res.status(400).json({
                error: "Please check and add a future date for the job posting scheduled date."
            });
        }

        // Fetch firm name for display
        const firm = await Lawfirm.findById(req.session.user.id).select("firmName").lean();

        const newJob = new JobPosting({
            lawfirmId: req.session.user.id,
            firmName: firm?.firmName || "Verified Law Firm",
            jobTitle,
            practiceArea,
            experienceRequired,
            location,
            jobType,
            description,
            scheduledDate: jobDate,
            status: status || "Active"
        });

        await newJob.save();

        return res.status(201).json({
            message: "Job posting created successfully",
            job: newJob
        });

    } catch (error) {
        console.error("Error in CreateJobPosting:", error);
        return res.status(500).json({
            error: error.message || "Server error while creating job posting"
        });
    }
}

// List all active jobs from the JobPosting collection
export async function listJobs(req, res) {
    try {
        // Automatically delete jobs whose scheduled date has passed
        await cleanupExpiredJobs();

        const jobs = await JobPosting.find({ status: { $ne: "Closed" } })
            .populate('lawfirmId', 'firmName contactEmail officeLocations practicesAreas website')
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json(jobs || []);
    } catch (error) {
        console.error("Error listing jobs:", error);
        return res.status(500).json({ error: "Failed to fetch jobs" });
    }
}