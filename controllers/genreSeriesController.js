import GenreSeries from '../models/genreSeries.js';

export const createGenreSeries = async (req, res) => {
  try {
    const { genre, series } = req.body;
    const newGenreSeries = new GenreSeries({ genre, series });
    await newGenreSeries.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'Genre-Series relation created successfully',
      data: newGenreSeries,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getAllGenreSeries = async (req, res) => {
  try {
    const genreSeries = await GenreSeries.find().populate('genre').populate('series');
    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre-Series relations fetched successfully',
      data: genreSeries,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getGenreSeriesById = async (req, res) => {
  try {
    const genreSeries = await GenreSeries.findById(req.params.id).populate('genre').populate('series');
    if (!genreSeries) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Genre-Series relation not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre-Series relation fetched successfully',
      data: genreSeries,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const updateGenreSeries = async (req, res) => {
  try {
    const updatedGenreSeries = await GenreSeries.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGenreSeries) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Genre-Series relation not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre-Series relation updated successfully',
      data: updatedGenreSeries,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const deleteGenreSeries = async (req, res) => {
  try {
    const deletedGenreSeries = await GenreSeries.findByIdAndDelete(req.params.id);
    if (!deletedGenreSeries) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Genre-Series relation not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre-Series relation deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};
const getGenreSeriesWithDetails = async (req, res) => {
  try {
    const genreSeries = await db.collection('genre_series').aggregate([
      {
        $lookup: {
          from: "genres",
          localField: "genre_id",
          foreignField: "id",
          as: "genreDetails"
        }
      },
      {
        $unwind: "$genreDetails"
      },
      {
        $lookup: {
          from: "series",
          localField: "series_id",
          foreignField: "id",
          as: "seriesDetails"
        }
      },
      {
        $unwind: "$seriesDetails"
      }
    ]).toArray();
    
    res.json(genreSeries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getGenreSeriesWithDetails };