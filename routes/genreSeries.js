import express from 'express';
import {
  createGenreSeries,
  getAllGenreSeries,
  getGenreSeriesById,
  updateGenreSeries,
  deleteGenreSeries,
} from '../controllers/genreSeriesController.js';

const router = express.Router();

router.post('/', createGenreSeries);
router.get('/', getAllGenreSeries);
router.get('/:id', getGenreSeriesById);
router.put('/:id', updateGenreSeries);
router.delete('/:id', deleteGenreSeries);

export default router;
