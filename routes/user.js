const { verifyAdmin, verifyUser } = require("../middlewares/verify.js");

const {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserDetailById,
} = require("../contollers/user.js");

const express = require("express");
const router = express.Router();

router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.get("/getUserDetailById/:id", verifyUser, getUserDetailById);
router.put("/updateUser/:id", verifyUser, updateUser);
router.delete("/deleteUser/:id", verifyUser, deleteUser);

module.exports = router;
