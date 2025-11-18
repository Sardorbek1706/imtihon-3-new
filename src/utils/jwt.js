import jwt from 'jsonwebtoken';
import { config } from '../config';

const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET);
};

export { generateToken, verifyToken };