import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "notes_media",
    resource_type: "auto",
    format: async (req, file) => file.originalname.split(".").pop(),
  },
});

//Multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf|doc|docx|txt/;
    const extname = allowed.test(file.originalname.split(".").pop().toLowerCase());
    const mimetype = allowed.test(file.mimetype);

    if (mimetype && extname) cb(null, true);
    else cb(new Error("Unsupported file type"));
  },
});

export { cloudinary, upload };
