import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

// Import routes
import userRoutes from './routes/users.js';
import genreRoutes from './routes/genres.js';
import seriesRoutes from './routes/series.js';
import seasonRoutes from './routes/seasons.js';
import episodeRoutes from './routes/episodes.js';
import streamRoutes from './routes/streams.js';
import genreSeriesRoutes from './routes/genreSeries.js';
import fileRoutes from './routes/file.js';

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up file upload storage and middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static('uploads')); // Serve static files

// Routes
app.use('/users', userRoutes);
app.use('/genres', genreRoutes);
app.use('/series', seriesRoutes);
app.use('/seasons', seasonRoutes);
app.use('/episodes', episodeRoutes);
app.use('/streams', streamRoutes);
app.use('/genreseries', genreSeriesRoutes);
app.use('/files', upload.single('file'), fileRoutes);

// Connect to MongoDBconst url = 
'mongodb://localhost:27017/mydatabase';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    response: 'Error',
    message: 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
