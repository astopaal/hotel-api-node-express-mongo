const User = require("../models/User.js");

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Silme işlemi başarılı." });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const getUserDetailById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = { deleteUser, updateUser, getAllUsers, getUserDetailById };
