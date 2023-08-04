import mongoose, { Schema,  Types } from "mongoose";

export interface ITags extends mongoose.Document {
  name: string;
  image?: string;  
}

const tagSchema = new mongoose.Schema<ITags>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
        type: String,
    },
   
  },
  { timestamps: true }
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
