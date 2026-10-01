import express from 'express';
import * as LawfirmController from '../../controllers/LawfirmController/LawFirmController.js';

let router = express.Router();

router.get("/register", LawfirmController.GetFirmRegister);
router.post("/register", LawfirmController.addFirm);
router.get("/ListLawyers", LawfirmController.ListLawyers);

router.get('/profile', LawfirmController.getProfile);
router.patch('/profile', LawfirmController.updateProfile);
router.patch('/updateProfile', LawfirmController.updateProfile);

export default router;
