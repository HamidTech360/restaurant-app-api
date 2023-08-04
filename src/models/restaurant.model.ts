import mongoose, { Schema,  Types } from "mongoose";

export interface IRestaurant extends mongoose.Document {
  name: string;
  image?: string;
  ratings: string;
  star?:string;
  recipes: [string];
  
}

const restaurantSchema = new mongoose.Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
        type: String,
    },
    ratings: {
      type: String,
      required: true,
    },
    star: {
      type: String,
      required: true,
    },
    recipes: { type: [String] },
  },
  { timestamps: true }
);

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
