import jwt from 'jsonwebtoken';
import config from '../config/config';

const authMiddleware = (req, res, next) =>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({error:'Acesso negado.token não fornecido.'});
    }
    try {
        const  decoded =jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({error:'Token inválido'});
        
    }
};
export default authMiddleware;
