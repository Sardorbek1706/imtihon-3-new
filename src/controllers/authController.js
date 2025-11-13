const db = require('../db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const generateOtp = () => Math.floor(100000 + Math.random()*900000).toString();

exports.signup = async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;
    if (!email || !username || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await db('users').where({ email }).first();
    if (exists) return res.status(400).json({ message: 'Email already used' });
    const hashed = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const otp = generateOtp();
    const otpExpire = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRE_MINUTES || '5')*60*1000));
    await db('users').insert({
      id, email, username, password: hashed, role: role || 'user', status: 'inactive',
      otp_code: otp, otp_expire: otpExpire
    });
    console.log('OTP for', email, '=', otp);
    res.status(201).json({ message: 'User created', userId: id, otpSent: true });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Missing fields' });
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp_code !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (new Date(user.otp_expire) < new Date()) return res.status(400).json({ message: 'OTP expired' });
    await db('users').where({ id: user.id }).update({ status: 'active', otp_code: null, otp_expire: null });
    res.json({ message: 'User verified' });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.status !== 'active') return res.status(403).json({ message: 'Account not active. Verify OTP.' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
    // store refresh token in DB (simple)
    await db('refresh_tokens').insert({ id: require('uuid').v4(), user_id: user.id, token: refreshToken, created_at: new Date() });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Missing refreshToken' });
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const stored = await db('refresh_tokens').where({ token: refreshToken }).first();
    if (!stored) return res.status(401).json({ message: 'Invalid refresh token' });
    const accessToken = jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const newRefresh = jwt.sign({ sub: payload.sub }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
    // replace token
    await db('refresh_tokens').where({ id: stored.id }).update({ token: newRefresh, created_at: new Date() });
    res.json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db('users').where({ id: payload.sub }).select('id','email','username','role','status','created_at','updated_at').first();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    const payload = jwt.decode(token);
    // remove refresh tokens for user
    await db('refresh_tokens').where({ user_id: payload.sub }).del();
    res.json({ message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
};
