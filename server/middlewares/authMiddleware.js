// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check authentication using JWT
const authenticateToken = (req, res, next) => {
  // Get token from header
  const token = req.headers['authorization'];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach user information to request
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

// Middleware for role-based authorization
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
