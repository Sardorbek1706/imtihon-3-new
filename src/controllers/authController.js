const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const logger = require('../logger');
const { success, error } = require('../utils/response');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

function generateAccessToken(user){
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function generateRefreshToken(user){
  return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRES_IN });
}

exports.register = async (req,res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(error('Validation failed', errors.array()));

    const { email, password } = req.body;
    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(400).json(error('Email already registered'));

    if (password.length < 8) return res.status(400).json(error('Password too short'));

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await userModel.createUser(email, hash, verificationToken);

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'Verify email', html: `<a href="${verifyUrl}">${verifyUrl}</a>` });

    logger.info(`Registered new user ${email}`);
    return res.status(201).json(success('Registered. Check email for verification'));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.verifyEmail = async (req,res) => {
  try{
    const { token } = req.query;
    if (!token) return res.status(400).json(error('Token not provided'));
    const user = await userModel.findByVerificationToken(token);
    if (!user) return res.status(400).json(error('Invalid token'));
    await userModel.verifyUser(user.id);
    logger.info(`User verified: ${user.email}`);
    return res.json(success('Email verified'));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.login = async (req,res) => {
  try{
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) return res.status(400).json(error('Email or password incorrect'));
    if (!user.is_verified) return res.status(403).json(error('Email not verified'));
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json(error('Email or password incorrect'));
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await userModel.saveRefreshToken(user.id, refreshToken);
    return res.json(success('Logged in', { accessToken, refreshToken }));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.refresh = async (req,res) => {
  try{
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json(error('Refresh token required'));
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, payload) => {
      if (err) return res.status(401).json(error('Invalid token'));
      const user = await userModel.findById(payload.id);
      if (!user || user.refresh_token !== refreshToken) return res.status(401).json(error('Token mismatch'));
      const newAccess = generateAccessToken(user);
      const newRefresh = generateRefreshToken(user);
      await userModel.saveRefreshToken(user.id, newRefresh);
      return res.json(success('Token refreshed', { accessToken: newAccess, refreshToken: newRefresh }));
    });
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.protected = async (req,res) => {
  return res.json(success('Access granted', { user: req.user }));
};
