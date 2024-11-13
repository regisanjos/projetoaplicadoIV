const { Router } = require("express");
const { body, param } = require("express-validator");
const donationController = require("../controllers/donationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

// Validações
const validateDonation = [
  body('userId').isInt().withMessage('O ID do usuário deve ser um número inteiro'),
  body('disasterId').isInt().withMessage('O ID do desastre deve ser um número inteiro'),
  body('type').notEmpty().withMessage('O tipo de doação é obrigatório'),
  body('description').notEmpty().withMessage('A descrição é obrigatória'),
];

const validateDonationId = [
  param('id').isInt().withMessage('O ID da doação deve ser um número inteiro'),
];

// Rotas para doações
// Obter todas as doações
router.get('/donations', donationController.getAll);

// Criar uma nova doação
router.post(
  '/donations',
  authMiddleware,
  validateDonation,
  donationController.create
);

// Obter uma doação pelo ID
router.get(
  '/donations/:id',
  authMiddleware,
  validateDonationId,
  donationController.getById
);

// Atualizar uma doação
router.put(
  '/donations/:id',
  authMiddleware,
  validateDonationId,
  validateDonation,
  donationController.update
);

// Deletar uma doação
router.delete(
  '/donations/:id',
  authMiddleware,
  validateDonationId,
  donationController.delete
);

module.exports = router;
