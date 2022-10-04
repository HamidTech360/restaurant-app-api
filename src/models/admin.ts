import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";


const adminSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
      required:true
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    isMainAdmin:{
      type:Boolean,
      default:false
    }
}, {timestamps:true})

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  adminSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
