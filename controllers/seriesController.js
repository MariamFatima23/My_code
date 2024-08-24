import Series from '../models/series.js';
import Genre from '../models/genre.js'; // Import Genre if you need to populate genres

// Create a new series
export const createSeries = async (req, res) => {
  try {
    const { name, description, genre_ids, trailer_id, rating, image_id } = req.body;
    const newSeries = new Series({ name, description, genre_ids, trailer_id, rating, image_id });
    await newSeries.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'Series created successfully',
      data: newSeries,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Get all series with optional query parameters
export const getAllSeries = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre_id, sort = 'name' } = req.query;
    const query = {};
    if (genre_id) {
      query.genre_ids = genre_id;
    }

    const series = await Series.find(query)
      .populate('genre_ids') // If you need to populate genres
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort);

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Series fetched successfully',
      data: series,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Get series by ID
export const getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id).populate('genre_ids');
    if (!series) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Series not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Series fetched successfully',
      data: series,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Update series by ID
export const updateSeries = async (req, res) => {
  try {
    const updatedSeries = await Series.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('genre_ids');
    if (!updatedSeries) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Series not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Series updated successfully',
      data: updatedSeries,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Delete series by ID
export const deleteSeries = async (req, res) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(req.params.id);
    if (!deletedSeries) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Series not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Series deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};


// Get all series with their seasons and episodes
const getSeriesWithSeasonsAndEpisodes = async (req, res) => {
  try {
    const series = await db.collection('series').aggregate([
      {
        $lookup: {
          from: "seasons",
          localField: "id",
          foreignField: "series_id",
          as: "seasons"
        }
      },
      {
        $unwind: "$seasons"
      },
      {
        $lookup: {
          from: "episodes",
          localField: "seasons.id",
          foreignField: "season_id",
          as: "episodes"
        }
      }
    ]).toArray();
    
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSeriesWithSeasonsAndEpisodes };
