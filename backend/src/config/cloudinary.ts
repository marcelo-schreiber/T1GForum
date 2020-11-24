import * as cloudinary from "cloudinary";
import * as env from "dotenv";

env.config();

var cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloud;
