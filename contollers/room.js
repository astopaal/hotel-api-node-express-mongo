const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    const room = await Room.create(req.body);
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
