import express from "express";
import { Register, Login, Logout,forgotPassword,resetPassword} from "../controller/authController.js";
import { validate} from "../middleware/authMiddleware.js";
import { registerSchema } from "../validation/authValidate.js";

const router = express.Router();

router.post("/register",validate(registerSchema),Register);
router.post("/login",Login);
router.post("/logout",Logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;