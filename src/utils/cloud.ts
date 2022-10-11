import { config } from "dotenv";
config()
import Cloudinary from 'cloudinary'
const cloudinary = Cloudinary.v2

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret
})

export default cloudinary