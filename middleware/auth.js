const jwt = require("jsonwebtoken");
const config = require("config");

const verifyToken = (req, res, next) => {
  const token = req.header("x-authorization-header");

  if (!token) return res.status(401).send("access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey.secret"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};

const verifyAdminRole = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) return res.status(403).send("not authorized");
  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole
};
