const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//bir hoteli günceller
const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//bir oteli siler
const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "delete successful." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//bir oteli çeker
const getSingleHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//tüm otelleri çeker
const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotel = await Hotel.find({
      ...others,
      cheapestPrices: { $gt: min | 1, $lt: max | 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotel = await Hotel.countDocuments({ type: "hotel" });
    const apartment = await Hotel.countDocuments({ type: "apartment" });
    const resort = await Hotel.countDocuments({ type: "resort" });
    const villa = await Hotel.countDocuments({ type: "villa" });

    res.status(200).json([
      {
        type: "hotel",
        count: hotel,
      },
      {
        type: "apartment",
        count: apartment,
      },
      {
        type: "resort",
        count: resort,
      },
      {
        type: "villa",
        count: villa,
      },
    ]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const hotel = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getSingleHotel,
};
