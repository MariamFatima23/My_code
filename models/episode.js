import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  season_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
  id: { type:Int16Array, required:true},
  name: { type: String, required: true },
  description: { type: String },
  thumbnail_id: { type: Int8Array},
}, { timestamps: true });

export default mongoose.model('Episode', episodeSchema);
