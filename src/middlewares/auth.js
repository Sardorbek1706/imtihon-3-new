const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db('users').where({ id: payload.sub }).first();
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
