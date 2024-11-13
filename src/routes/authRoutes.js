const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest");
const rateLimit = require("express-rate-limit");

const router = Router();

// Middleware de limitação de taxa para login e redefinição de senha
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo de 10 requisições por IP
  message: "Muitas tentativas de login. Tente novamente mais tarde.",
});

// Rotas de autenticação
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    validateRequest,
  ],
  authController.register
);

router.post(
  '/login',
  authRateLimiter,
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('A senha é obrigatória'),
    validateRequest,
  ],
  authController.login
);

router.post(
  '/forgot-password',
  [
    body('email').isEmail().withMessage('Email inválido'),
    validateRequest,
  ],
  authController.forgotPassword
);

router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('O token é obrigatório'),
    body('newPassword').isLength({ min: 6 }).withMessage('A nova senha deve ter pelo menos 6 caracteres'),
    validateRequest,
  ],
  authController.resetPassword
);

module.exports = router;
