const { Router } = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/users', userController.create);
router.use(authMiddleware);// Aplica authMiddleware a todas as rotas abaixo
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;
