import express from 'express';
import {
  createSeason,
  getAllSeasons,
  getSeasonById,
  updateSeason,
  deleteSeason,
} from '../controllers/seasonController.js';

const router = express.Router();

router.post('/', createSeason);
router.get('/', getAllSeasons);
router.get('/:id', getSeasonById);
router.put('/:id', updateSeason);
router.delete('/:id', deleteSeason);

export default router;
