import Episode from '../models/episode.js';

export const createEpisode = async (req, res) => {
  try {
    const { season, name, description, file_id } = req.body;
    const newEpisode = new Episode({ season, name, description, file_id });
    await newEpisode.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'Episode created successfully',
      data: newEpisode,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find().populate('season').populate('file_id');
    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Episodes fetched successfully',
      data: episodes,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getEpisodeById = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id).populate('season').populate('file_id');
    if (!episode) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Episode not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Episode fetched successfully',
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const updateEpisode = async (req, res) => {
  try {
    const updatedEpisode = await Episode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEpisode) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Episode not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Episode updated successfully',
      data: updatedEpisode,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const deleteEpisode = async (req, res) => {
  try {
    const deletedEpisode = await Episode.findByIdAndDelete(req.params.id);
    if (!deletedEpisode) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Episode not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Episode deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};
const getEpisodesWithSeriesAndSeasons = async (req, res) => {
  try {
    const episodes = await db.collection('episodes').aggregate([
      {
        $lookup: {
          from: "seasons",
          localField: "season_id",
          foreignField: "id",
          as: "seasonDetails"
        }
      },
      {
        $unwind: "$seasonDetails"
      },
      {
        $lookup: {
          from: "series",
          localField: "seasonDetails.series_id",
          foreignField: "id",
          as: "seriesDetails"
        }
      },
      {
        $unwind: "$seriesDetails"
      }
    ]).toArray();
    
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getEpisodesWithSeriesAndSeasons };