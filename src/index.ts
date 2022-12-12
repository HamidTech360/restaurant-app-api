import express, { Application, Response } from "express";
import { config } from "dotenv";
import connectDB from "./lib/db";
import cors from "cors";


//route imports

import auth from './routes/auth'
import student from './routes/student'


//dotenv config
config();
const app: Application = express();

//connectDB
connectDB();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use("/api/auth", auth)
app.use("/api/student", student)





app.listen(process.env.PORT, () =>
  console.log(`Express app running on ${process.env.PORT}`)
);
