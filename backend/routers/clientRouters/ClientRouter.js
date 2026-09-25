import express from 'express'
import * as clientController from "../../controllers/clientController/ClientController.js"

let router=express.Router();


router.post("/register",clientController.addClient)
router.get("/register",clientController.getRegisterForm)
router.get("/ListLawyers",clientController.ListLawyers)
router.get("/ListLawfirms",clientController.ListLawfirms)

export default router