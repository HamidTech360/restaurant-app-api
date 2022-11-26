import express, { Application, Response } from "express";
import { config } from "dotenv";
import connectDB from "./lib/db";
import cors from "cors";


//route imports

import auth from './routes/auth'


//dotenv config
config();
const app: Application = express();

//connectDB
connectDB();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use("/api/auth", auth)

//mongodb+srv://Admin:12345@da-schools.1xq6ql5.mongodb.net/?retryWrites=true&w=majority

app.get("/", (res: Response) => res.send("Hello"));

app.listen(process.env.PORT, () =>
  console.log(`Express app running on ${process.env.PORT}`)
);
