import Genre from '../models/genre.js';

// Create a new genre
export const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const newGenre = new Genre({ name });
    await newGenre.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'Genre created successfully',
      data: newGenre,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Get all genres
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genres fetched successfully',
      data: genres,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Get genre by ID
export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Genre not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre fetched successfully',
      data: genre,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Update genre by ID
export const updateGenre = async (req, res) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGenre) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Genre not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre updated successfully',
      data: updatedGenre,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

// Delete genre by ID
export const deleteGenre = async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Genre not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Genre deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};const getGenresWithSeries = async (req, res) => {
  try {
    const genres = await db.collection('genres').aggregate([
      {
        $lookup: {
          from: "genre_series",
          localField: "id",
          foreignField: "genre_id",
          as: "genreSeries"
        }
      },
      {
        $unwind: "$genreSeries"
      },
      {
        $lookup: {
          from: "series",
          localField: "genreSeries.series_id",
          foreignField: "id",
          as: "seriesDetails"
        }
      }
    ]).toArray();
    
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getGenresWithSeries };

