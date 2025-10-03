import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {type:String,required:true},
    content:{type:String,required:true},
    userID: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    
},{timestamp: true,});

const note = mongoose.model('Note',noteSchema);
export default note;