const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/verify.js");

const {
  getRoomDetailById,
  getAllRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} = require("../contollers/room.js");

router.get("/getRoomDetailById/:id", getRoomDetailById);
router.delete("/deleteRoom/:id/:hotelId", verifyAdmin, deleteRoom);
router.put("/updateRoom/:id", verifyAdmin, updateRoom);
router.get("/getAllRooms", getAllRooms);
router.post("/createRoom/:id/:hotelId", verifyAdmin, createRoom);

module.exports = router;
