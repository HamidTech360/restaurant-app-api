import express, { Application, Response } from "express";
import { config } from "dotenv";
import connectDB from "./lib/db";
import cors from "cors";


//route imports

import restaurant from './routes/restaurant.route'



//dotenv config
config();
const app: Application = express();

//connectDB
connectDB();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use("/api/v1/restaurant", restaurant)




app.listen(process.env.PORT, () =>
  console.log(`Express app running on ${process.env.PORT}`)
);
