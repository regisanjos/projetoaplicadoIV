const { Router } = require('express');
const etaController = require('../controllers/etaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/etas', authMiddleware, etaController.create);
router.get('/etas/donation/:donationId', authMiddleware, etaController.getByDonationId);
router.put('/etas/:id', authMiddleware, etaController.update);
router.delete('/etas/:id', authMiddleware, etaController.delete);
router.get('/etas', authMiddleware, etaController.getAll);

module.exports = router;
