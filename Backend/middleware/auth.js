const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified; // Store admin info in request
    next(); // Move to the next middleware
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { verifyToken };
