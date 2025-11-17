const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { error } = require('../utils/response');
require('dotenv').config();

module.exports = async (req,res,next) => {
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json(error('Token required'));
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json(error('Token required'));
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) return res.status(401).json(error('Invalid token'));
      const user = await userModel.findById(payload.id);
      if (!user) return res.status(401).json(error('User not found'));
      req.user = { id: user.id, email: user.email, role: user.role };
      next();
    });
  }catch(e){
    return res.status(500).json(error('Server error'));
  }
};
