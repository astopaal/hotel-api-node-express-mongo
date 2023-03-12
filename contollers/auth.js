const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    //öncelikle mail duplicate kontrol
    const user = await User.findOne(email);
    if (user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı zaten mevcut" });
    }
    if (password.length < 6) {
      res.status(500).json({ message: "Parola 6 karakterden kısa olamaz" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    if (!validateEmail(email)) {
      res.status(500).json({ message: "Email geçerli değil." });
    }
    const newUser = await User.create({ ...req.body, password: passwordHash });
    const token = await jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(201).json({
      token,
      newUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    //öncelikle mail duplicate kontrol
    const user = await User.findOne(email);
    if (!user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ message: "Parolalar eşleşmedi" });
    }

    const token = await jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      token,
      user,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const validateEmail = (mail) => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)
  ) {
    return true;
  }
  return false;
};

module.exports = { register, login };
