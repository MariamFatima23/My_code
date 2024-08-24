import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  trailer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  id: { type: Number, required:true },
  thumbnail_id: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
}, { timestamps: true });

export default mongoose.model('Series', seriesSchema);
