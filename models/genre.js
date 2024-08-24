import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema(
  {
  name: { type: String, required: true },
  id: { type: Int16Array, required:true},
}, { timestamps: true });

export default mongoose.model('Genre', genreSchema);
