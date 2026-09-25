
import * as SignUp from'../../controllers/SignUpController/SignUp.js'

import express from 'express'


let router=express.Router()

router.post('/Authenticate',SignUp.Authicate)

export default router