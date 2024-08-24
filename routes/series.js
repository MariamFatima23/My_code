import express from 'express';
import {
  createSeries,
  getAllSeries,
  getSeriesById,
  updateSeries,
  deleteSeries,
} from '../controllers/seriesController.js';

const router = express.Router();

router.post('/', createSeries);
router.get('/', getAllSeries);
router.get('/:id', getSeriesById);
router.put('/:id', updateSeries);
router.delete('/:id', deleteSeries);

export default router;
