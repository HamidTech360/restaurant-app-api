import express, { Application, Response } from "express";
import { config } from "dotenv";
import connectDB from "./lib/db";
import cors from "cors";


//route imports

import auth from './routes/auth'
import student from './routes/student'
import result from './routes/results'
import otp from './routes/otp'
import event from './routes/event'
import notification from './routes/notification'
import analytics from './routes/analytics'
import staff from './routes/staffs'


//dotenv config
config();
const app: Application = express();

//connectDB
connectDB();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use("/api/auth", auth)
app.use("/api/student", student)
app.use("/api/result", result)
app.use("/api/otp", otp)
app.use("/api/event", event)
app.use("/api/notification", notification)
app.use("/api/analytics", analytics)
app.use("/api/staff", staff)



app.listen(process.env.PORT, () =>
  console.log(`Express app running on ${process.env.PORT}`)
);
