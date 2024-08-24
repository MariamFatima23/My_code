import express from 'express';
import {
  uploadFile,
  getFileById,
  getAllFiles,
  deleteFile,
} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', uploadFile);
router.get('/', getAllFiles);
router.get('/:id', getFileById);
router.delete('/:id', deleteFile);

export default router;
