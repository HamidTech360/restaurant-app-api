import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

interface IAddress {
  phone?: string;
  country?: string;
  location?: Record<string, string | number>;
  city?: string;
}

export interface IUserSchema extends Document {
  gender?: string;
  firstName: string;
  lastName: string;
  email: string;
  images: {
    avatar: string;
    cover: string;
  };
  username?: string;
  password: string;
  otherNames: string;
  isAdmin: boolean;
  address?: IAddress;
  fullAddress:string,
  status: string;
  confirmationCode: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  deleted: Boolean;
  profilePics: string;
  bio: string;
  authProvider: string;
  notificationOptions:String[];
  interests:string,
  dob:string,
  mobileNumber:string,
  websites:string
}

const userSchema = new Schema<IUserSchema>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  otherNames: {
    type: String,
  },
  images: {
    type: new Schema({
      avatar: String,
      cover: String,
    }),
  },
  password: {
    type: String,
    min: 8,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
  },
  fullAddress:{
    type:String
  },
  address: {
    type: new Schema({
      city: {
        type: String,
      },
      country: {
        type: Number,
        default: 0,
      },
      location: {
        type: Schema.Types.Mixed,
      },
    }),
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmationCode: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  bookmarks: {
    type: [Schema.Types.ObjectId],
    ref: "Feed",
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  bio: {
    type: String,
  },
  username:{
      type:String
  },
  authProvider: {
    type: String,
    default: "LOCAL",
  },
  notificationOptions:{
    type:[String]
  },
  interests:{
    type:String
  },
  dob:{
    type:String
  },
  mobileNumber:{
    type:String
  },
  websites:{
    type:String
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.index({ "$**": "text" });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
