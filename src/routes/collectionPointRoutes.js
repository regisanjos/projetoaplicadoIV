const { Router } = require('express');
const donationPointController = require('../controllers/donationPointController');
const adminOrCollectionPointMiddleware = require('../middlewares/adminOrCollectionPointMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// Rota para criar um ponto de coleta
router.post('/', authMiddleware, adminOrCollectionPointMiddleware, donationPointController.create);

// Rota para listar todos os pontos de coleta
router.get('/', donationPointController.getAll);

// Rota para buscar um ponto de coleta por ID
router.get('/:id', donationPointController.getById);

// Rota para atualizar um ponto de coleta
router.put('/:id', authMiddleware, adminOrCollectionPointMiddleware, donationPointController.update);

// Rota para deletar um ponto de coleta
router.delete('/:id', authMiddleware, adminOrCollectionPointMiddleware, donationPointController.delete);

module.exports = router;
