const jwt = require('jsonwebtoken'); 
const config = require('../config/config'); 
const crypto = require('crypto');


const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};


const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error(`Token inválido: ${error.message}`);
  }
};


const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
  generateRandomToken,
};
