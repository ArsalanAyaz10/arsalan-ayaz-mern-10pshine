import express from "express";
import { Register, Login, Logout } from "../controller/authController.js";
import { validate} from "../middleware/authMiddleware.js";
import { registerSchema } from "../validation/authValidate.js";

const router = express.Router();

router.post("/register",validate(registerSchema),Register);
router.post("/login",Login);
router.post("/logout",Logout);

export default router;