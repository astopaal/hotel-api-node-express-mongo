const express = require("express");

const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getSingleHotel,
} = require("../contollers/hotel.js");

const router = express.Router();

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.post("/createHotel", createHotel);
router.delete("/deleteHotel/:id", deleteHotel);
router.put("/updateHotel/:id", updateHotel);
router.get("/getSingleHotel/:id", getSingleHotel);
router.get("/getAllHotels", getAllHotels);

module.exports = router;
