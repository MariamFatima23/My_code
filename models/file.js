import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  path: { type: String, required: true },
  type: { type: String, required: true },
  id:{ type:Int16Array, required:true},
  size: { type:String, required:true},
  current_name: { type:String, required:true},
  original_name: {type:String, required:true},


}, { timestamps: true });

export default mongoose.model('File', fileSchema);
