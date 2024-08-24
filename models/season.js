import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
  series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
  name: { type: String, required: true },
  description: { type: String, required:true},
  id: { type:Int16Array, required:true},
}, { timestamps: true });

export default mongoose.model('Season', seasonSchema);
