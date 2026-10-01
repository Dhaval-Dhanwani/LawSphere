import express from 'express';
import session from 'express-session';
import cors from 'cors';
import database from '../databseconfig/config.js';
import clientrouter from '../routers/clientRouters/ClientRouter.js';
import lawfirmrouter from '../routers/LawfirmRouters/LawfirmRouters.js';
import lawyerRouter from '../routers/lawyerRouters/LawyerRouter.js';
import SignUpRouter from '../routers/OnlySignup/SignUpRouter.js';

let app = express();
const PORT = 3000;

//make database connection and start the server
async function applicationStart() {
    await database();

    try {
        // CORS helps communicate across different ports (Vite 5173 -> Express 3000)
        app.use(cors({
            origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
            credentials: true
        }));

        // urlencoded helps to permit formdata to express
        app.use(express.urlencoded({ extended: true }));
        // json parser
        app.use(express.json());

        // express-session middleware MUST be registered BEFORE routes
        app.use(session({
            secret: "lawsphere-secret-key",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                httpOnly: true,
                secure: false, // set to true in HTTPS production
                sameSite: 'lax'
            }
        }));

        // Routes
        app.use('/clients', clientrouter);
        app.use('/lawfirm', lawfirmrouter);
        app.use('/lawyers', lawyerRouter);
        app.use('/SignUp', SignUpRouter);

        app.listen(PORT, (err) => {
            if (err) {
                console.log("error here: " + err.message);
                throw err;
            }
            console.log(`Server connected successfully on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        throw error;
    }
}

applicationStart();