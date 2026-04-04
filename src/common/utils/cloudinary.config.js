import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../../../config/config.service.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "portfolio_assets" }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(fileBuffer);
  });
};