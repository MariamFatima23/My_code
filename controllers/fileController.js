import multer from 'multer';
import path from 'path';
import File from '../models/file.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadFile = (req, res) => {
  try {
    upload.single('file')(req, res, async (err) => {
      if (err) return res.status(400).json({ status: 400, response: 'Bad Request', message: err.message });

      const newFile = new File({
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
      });
      await newFile.save();

      res.status(201).json({
        status: 201,
        response: 'Created',
        message: 'File uploaded successfully',
        data: newFile,
      });
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ status: 404, response: 'Not Found', message: 'File not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'File fetched successfully',
      data: file,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Files fetched successfully',
      data: files,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const deletedFile = await File.findByIdAndDelete(req.params.id);
    if (!deletedFile) return res.status(404).json({ status: 404, response: 'Not Found', message: 'File not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'File deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};
