import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnect = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("cludinary connected succefully");
  } catch (error) {
    console.log("ERROR CONNECTING TO CLOUDINARY", error);
  }
};

export default cloudinaryConnect;
