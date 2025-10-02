import Note from '../models/NotesModel.js';


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
const createNote = async (req,res,next)=>{
    try{
       const {title,content} = req.body;   

       if(!title || !content){
        const error = new Error("Missing required fields");
         res.status(400);
         return next(error);
       }

       const note = await Note.create({
        title,
        content,
        userID: req.user._id,
       });

         res.status(201).json({
            message:"Note created",
            note,
         });


    }catch(error){
      next(error);
    }
}

const updateNote = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      const error = new Error("Missing required fields");
      res.status(400);
      return next(error);
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, userID: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      res.status(404);
      return next(new Error("Note not found"))
    }

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};


const deleteNote = async (req,res,next)=>{
    try{
        const {id} = req.params;

    if (!id) {
      res.status(400);
      next(new Error("Note ID is required"));
    }

    const note = await Note.findOneAndDelete({ _id: id, userID: req.user._id });

    if (!note) {
      res.status(404);
      next(new Error("Note not found"));
    }

    res.status(200).json({
            message: "Note deleted",
            note,
         });

    }catch(error){
        res.status(500).json({message: error.message});
    }

}

export {getNotes,createNote,updateNote,deleteNote};