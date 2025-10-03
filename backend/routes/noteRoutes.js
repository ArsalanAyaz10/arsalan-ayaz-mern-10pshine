import express from "express";
import { getNotes,createNote,updateNote,deleteNote } from "../controller/noteController.js";
import { Authenticate } from "../middleware/authMiddleware.js";  

const router = express.Router();

router.get("/fetch",Authenticate,getNotes);
router.post("/create",Authenticate,createNote);
router.put("/:id",Authenticate,updateNote);
router.delete("/:id",Authenticate,deleteNote);

export default router;