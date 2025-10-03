import Note from '../models/NotesModel.js';
import User from '../models/UserModel.js';


const getNotes = async (req,res)=>{
    try{
    
    const notes = await Note.find({userID:req.user._id}).sort({createdAt:-1});

    res.status(200).json({
    message:"Notes fetched successfully",
    notes
    });

    }catch(error){
        res.status(500).json({message: error.message});
    }
}
const createNote = async (req,res)=>{
    try{
       const {title,content} = req.body;   

       if(!title || !content){
        return res.status(400).json({message: "Mssing required fields"});
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
    res.status(500).json({message: error.message});
}
}

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, userID: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found or not authorized" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteNote = async (req,res)=>{
    try{
        const {id} = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

        const note = await Note.findOneAndDelete({ _id: id, userID: req.user._id });


    if (!note) {
      return res.status(404).json({ message: "Note not found" });
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