import express from 'express';
import session from 'express-session';
import cors from 'cors';
import database from '../databseconfig/config.js';
import clientrouter from '../routers/clientRouters/ClientRouter.js';
import lawfirmrouter from '../routers/LawfirmRouters/LawfirmRouters.js';
import lawyerRouter from '../routers/lawyerRouters/LawyerRouter.js';
import SignUpRouter from '../routers/OnlySignup/SignUpRouter.js';
import { AppointmentModel } from '../modelsSchema/AppointmenstSchema/appointmentSchema.js';
import { JobPosting } from '../modelsSchema/jobPosting/jobPostingSchema.js';

let app = express();
const PORT = 3000;

// Automatically delete appointments and job postings past their scheduled date
async function autoCleanupExpiredRecords() {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const deletedAppointments = await AppointmentModel.deleteMany({ date: { $lt: todayStart } });
        const deletedJobs = await JobPosting.deleteMany({ scheduledDate: { $lt: todayStart } });
        if (deletedAppointments.deletedCount > 0 || deletedJobs.deletedCount > 0) {
            console.log(`[Auto-Cleanup] Removed ${deletedAppointments.deletedCount} past appointments and ${deletedJobs.deletedCount} past job postings.`);
        }
    } catch (error) {
        console.error("[Auto-Cleanup] Error cleaning expired records:", error);
    }
}

//make database connection and start the server
async function applicationStart() {
    await database();
    await autoCleanupExpiredRecords();
    // Run cleanup periodically every 10 minutes
    setInterval(autoCleanupExpiredRecords, 10 * 60 * 1000);


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