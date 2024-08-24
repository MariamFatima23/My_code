import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  episode_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
  time: { type: Date, default: Date.now },
  id: { type: Number, required:true},
}, { timestamps: true });

export default mongoose.model('Stream', streamSchema);
