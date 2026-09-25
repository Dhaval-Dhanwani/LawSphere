import express from 'express'
import * as lawyercontroller from '../../controllers/lawyerController/lawyerController.js'

let router=express.Router()

router.get('/register',lawyercontroller.getLawyerRegister)
router.post('/register',lawyercontroller.addLawyer)
router.get('/ListLawfirms',lawyercontroller.listLawfirms)


export default router