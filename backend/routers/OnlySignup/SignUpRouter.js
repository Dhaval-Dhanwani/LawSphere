
import * as SignUp from'../../controllers/SignUpController/SignUp.js'

import express from 'express'


let router=express.Router()

router.post('/Authenticate', SignUp.Authicate);
router.get('/currentUser', SignUp.getCurrentUser);
router.post('/SignOut', SignUp.SignOut);

export default router;