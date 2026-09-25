import express from 'express'
import database from '../databseconfig/config.js'
import clientrouter from '../routers/clientRouters/ClientRouter.js'
import lawfirmrouter from '../routers/LawfirmRouters/LawfirmRouters.js'
import lawyerRouter from '../routers/lawyerRouters/LawyerRouter.js'
import SignUpRouter from '../routers/OnlySignup/SignUpRouter.js'
import cors from "cors";

let app=express();
const PORT=3000;

//make database connection and start the server
async function applicationStart()
{

    await database();

   
    try{
        //urlencoded helps to permit the formdata to express
         app.use(express.urlencoded({ extended: true }));
         
         app.use(express.json())  // help convert all request data to json form
         app.use(cors()) // helps to communicate two different ports on the broswer

         
        app.use('/clients',clientrouter)
        app.use('/lawfirm',lawfirmrouter)
        app.use('/lawyers',lawyerRouter)
        app.use('/SignUp',SignUpRouter)

        app.listen(PORT,(err)=>
        {
            if(err)
            {
                console.log("error here: "+err.message);
                throw err;
            }
            console.log("server connected successfully");

        }
        )
    
    }
    catch(error)
    {
        throw error.message;
    }
    
}


applicationStart();