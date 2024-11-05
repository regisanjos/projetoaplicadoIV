import jwt from 'jsonwebtoken';
import config from '../config/config';
import crypto from 'crypto';

export const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
