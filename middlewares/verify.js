const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Kullanıcı giriş yapmamış." });
  }

  jwt.verify(token, "SECRETKEY", (err, user) => {
    if (err) {
      res.status(500).json({ message: "Token geçersiz" });
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "Kullanıcı giriş yapmamış." });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(500)
        .json({ message: "Kullanıcı admin yetkisine sahip değil." });
    }
  });
};

module.exports = { verifyAdmin, verifyUser, verifyToken };
