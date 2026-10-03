import express from 'express';
import * as clientController from "../../controllers/clientController/ClientController.js";
import * as AppointmentController from "../../controllers/Appointment/mangeappointments.js"
let router = express.Router();

router.post("/register", clientController.addClient);
router.get("/register", clientController.getRegisterForm);
router.get("/ListLawyers", clientController.ListLawyers);
router.get("/ListLawfirms", clientController.ListLawfirms);

router.get('/profile', clientController.Profile);
router.patch('/profile', clientController.updateProfile);
router.patch('/updateProfile', clientController.updateProfile);

router.get('/appointments',AppointmentController.GetClientAppointments)
router.post('/makeappointment',clientController.MakeAppointment)
router.patch('/CancelAppointment',clientController.CancelAppointment)

export default router;