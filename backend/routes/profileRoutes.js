import express from "express";
import { Authenticate } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/profile", Authenticate, getProfile);
router.put("/profile/update", Authenticate, updateProfile);
router.put("/profile/change-password", Authenticate, changePassword);

export default router;
