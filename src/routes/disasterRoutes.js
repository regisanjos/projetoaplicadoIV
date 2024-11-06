const { Router } = require("express");
const disasterController = require("../controllers/disasterController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get('/disasters', disasterController.getAllDisasters);
router.post('/disasters', authMiddleware, disasterController.create); 
router.get('/disasters/:id', authMiddleware, disasterController.getDisasterById); 
router.put('/disasters/:id', authMiddleware, disasterController.update); 
router.delete('/disasters/:id', authMiddleware, disasterController.delete); 

module.exports = router;
