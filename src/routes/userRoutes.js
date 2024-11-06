const { Router } = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');




const router = Router();

router.post('/users', userController.create);
router.get('/users', authMiddleware, userController.getAll);
router.get('/users/:id', authMiddleware, userController.getById);
router.put('/users/:id', authMiddleware, userController.update);
router.delete('/users/:id', authMiddleware, userController.delete);

module.exports = router;





 

