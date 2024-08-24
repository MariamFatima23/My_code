import mongoose from 'mongoose';

const genreSeriesSchema = new mongoose.Schema({
  genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
  id: { type: Int16Array, required:true},
}, { timestamps: true });

export default mongoose.model('GenreSeries', genreSeriesSchema);
