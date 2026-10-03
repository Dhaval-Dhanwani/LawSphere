import express from 'express';
import * as LawfirmController from '../../controllers/LawfirmController/LawFirmController.js';
import * as AppointmentController from '../../controllers/Appointment/mangeappointments.js';

let router = express.Router();

router.get("/register", LawfirmController.GetFirmRegister);
router.post("/register", LawfirmController.addFirm);
router.get("/ListLawyers", LawfirmController.ListLawyers);

router.get('/profile', LawfirmController.getProfile);
router.patch('/profile', LawfirmController.updateProfile);
router.patch('/updateProfile', LawfirmController.updateProfile);

router.post('/JobPosting', LawfirmController.CreateJobPosting);
router.get('/jobs', LawfirmController.listJobs);

router.get('/appointments', AppointmentController.GetLawfirmAppointments);
router.patch('/AppointmentStatus', LawfirmController.UpdateAppointmentStatus);

export default router;

