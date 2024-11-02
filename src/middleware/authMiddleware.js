import jwt from 'jsonwebtoken';
import config from '../config/config';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token após "Bearer "

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Armazena as informações do usuário decodificadas no req.user
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};

export default authMiddleware;
