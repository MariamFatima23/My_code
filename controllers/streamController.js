import Stream from '../models/stream.js';

export const createStream = async (req, res) => {
  try {
    const { user, episode, start_time } = req.body;
    const newStream = new Stream({ user, episode, start_time });
    await newStream.save();

    res.status(201).json({
      status: 201,
      response: 'Created',
      message: 'Stream created successfully',
      data: newStream,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find().populate('user').populate('episode');
    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Streams fetched successfully',
      data: streams,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const getStreamById = async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id).populate('user').populate('episode');
    if (!stream) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Stream not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Stream fetched successfully',
      data: stream,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const updateStream = async (req, res) => {
  try {
    const updatedStream = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStream) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Stream not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Stream updated successfully',
      data: updatedStream,
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};

export const deleteStream = async (req, res) => {
  try {
    const deletedStream = await Stream.findByIdAndDelete(req.params.id);
    if (!deletedStream) return res.status(404).json({ status: 404, response: 'Not Found', message: 'Stream not found' });

    res.status(200).json({
      status: 200,
      response: 'OK',
      message: 'Stream deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 500, response: 'Internal Server Error', message: error.message });
  }
};const getEpisodesWithSeriesAndSeasons = async (req, res) => {
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
