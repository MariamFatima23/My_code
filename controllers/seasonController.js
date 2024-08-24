import Season from '../models/season.js';

export const createSeason = async (req, res) => {
  try {
    const { series, name } = req.body;
    const newSeason = new Season({ series, name });
    await newSeason.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'Season created successfully',
      data: newSeason,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find().populate('series');
    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Seasons fetched successfully',
      data: seasons,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getSeasonById = async (req, res) => {
  try {
    const season = await Season.findById(req.params.id).populate('series');
    if (!season) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Season not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Season fetched successfully',
      data: season,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const updateSeason = async (req, res) => {
  try {
    const updatedSeason = await Season.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSeason) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Season not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Season updated successfully',
      data: updatedSeason,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const deleteSeason = async (req, res) => {
  try {
    const deletedSeason = await Season.findByIdAndDelete(req.params.id);
    if (!deletedSeason) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Season not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Season deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};const getSeasonsWithEpisodes = async (req, res) => {
  try {
    const seasons = await db.collection('seasons').aggregate([
      {
        $lookup: {
          from: "episodes",
          localField: "id",
          foreignField: "season_id",
          as: "episodes"
        }
      }
    ]).toArray();
    
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSeasonsWithEpisodes };

