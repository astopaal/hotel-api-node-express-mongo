const express = require("express");
const router = express.Router();

const { verifyAdmin } = require("../middlewares/verify.js");

const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getSingleHotel,
} = require("../contollers/hotel.js");

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.post("/createHotel", verifyAdmin, createHotel);
router.delete("/deleteHotel/:id", verifyAdmin, deleteHotel);
router.put("/updateHotel/:id", verifyAdmin, updateHotel);
router.get("/getSingleHotel/:id", getSingleHotel);
router.get("/getAllHotels", getAllHotels);

module.exports = router;
