import Note from '../models/NotesModel.js';
import { cloudinary } from '../config/cloudinary.js';

const getNotes = async (req,res,next)=>{
    try{
   
    const notes = await Note.find({userID:req.user._id}).sort({createdAt:-1});

    if (!notes) {
      res.status(404);
      throw new Error("No notes found for this user");
    }

    res.status(200).json({
    message:"Notes fetched successfully",
    notes
    });

    }catch(error){
      next(error);
    }
}
const createNote = async (req, res, next) => {
  try {
   // console.log("File received:", req.file);

    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400);
      throw new Error("Missing required fields");
    }

    let fileData = {};
    if (req.file) {
      fileData = {
        fileUrl: req.file.path,
        filePublicId: req.file.filename,
        fileType: req.file.mimetype,
      };
    }

    const note = await Note.create({
      title,
      content,
      userID: req.user._id,
      ...fileData,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error("Error in createNote:", error);
    next(error);
  }
};

const updateNote = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      const error = new Error("Missing required fields");
      res.status(400);
      return next(error);
    }
    
   const note = await Note.findOne({
      _id: id,
      userID: req.user._id,
   });

    if (!note) {
      const error = new Error("Note not found");
      res.status(404);
      return next(error)
    }

    let fileData = {};
    if (req.file) {
      if (note.filePublicId) {
        try {
          await cloudinary.uploader.destroy(note.filePublicId, { resource_type: "auto" });
          console.log("Old Cloudinary file deleted:", note.filePublicId);
        } catch (cloudErr) {
          console.error("Error deleting old file:", cloudErr);
        }
      }

      fileData = {
        fileUrl: req.file.path,
        filePublicId: req.file.filename,
        fileType: req.file.mimetype,
      };
    }

      const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userID: req.user._id },
      {
        title,
        content,
        ...fileData,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      return next(new Error("Note ID is required"));
    }

    const note = await Note.findOneAndDelete({ _id: id, userID: req.user._id });

    if (!note) {
      res.status(404);
      return next(new Error("Note not found"));
    }

    if (note.filePublicId) {
      try {
        let resourceType = "raw";
        if (note.fileType.startsWith("image/")) resourceType = "image";
        else if (note.fileType.startsWith("video/")) resourceType = "video";

        const result = await cloudinary.uploader.destroy(note.filePublicId, {
          resource_type: resourceType,
        });

        console.log("Cloudinary delete result:", result);
      } catch (err) {
        console.error("Error deleting file from Cloudinary:", err);
      }
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export {getNotes,createNote,updateNote,deleteNote};