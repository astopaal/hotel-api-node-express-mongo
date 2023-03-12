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

const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const hotelId = req.param.hotelId;
  try {
    const room = await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(hotel, { $pull: { rooms: roomId } });
    res.status(200).json({ message: "Delete successful." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getRoomDetailById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const room = await Room.find();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRoomDetailById,
  getAllRooms,
  createRoom,
  deleteRoom,
  updateRoom,
};
