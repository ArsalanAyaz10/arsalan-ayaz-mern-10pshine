import express from "express";
import { getNotes,createNote,updateNote,deleteNote } from "../controller/noteController.js";
import { Authenticate } from "../middleware/authMiddleware.js";  
import {noteSchema} from "../validation/noteValidate.js";
import {checkNote} from "../middleware/noteMiddleware.js";
import {upload} from "../config/cloudinary.js";


const router = express.Router();

router.get("/fetch",Authenticate,getNotes);
router.post("/create", Authenticate, upload.single("file"),checkNote(noteSchema),createNote);
router.put("/:id",Authenticate,upload.single("file"),updateNote);
router.delete("/:id",Authenticate,deleteNote);

export default router;