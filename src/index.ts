import express, { Application, Response } from "express";
import { config } from "dotenv";
import connectDB from "./lib/db";
import cors from "cors";


//route imports
import schools from './routes/schools'
import auth from './routes/auth'

//dotenv config
config();
const app: Application = express();

//connectDB
connectDB();
app.use(cors());
app.use(express.json());


app.use("/api/schools", schools);
app.use("/api/auth", auth)


app.get("/", (res: Response) => res.send("Hello"));

app.listen(process.env.PORT, () =>
  console.log(`Express app running on ${process.env.PORT}`)
);
