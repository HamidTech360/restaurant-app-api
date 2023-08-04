import mongoose from "mongoose";
import dotenv from "dotenv";

import tags from "./data/tags";

import Tag from "./models/tags.model";
import connectDB from "./lib/db";

dotenv.config();

connectDB();

const importData = async () => {
  try {
   
    await Tag.deleteMany();
    const createdTags = await Tag.insertMany(tags);

    
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

;

importData()
