const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
