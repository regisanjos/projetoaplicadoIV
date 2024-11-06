
const { Router } = require("express");
const disasterController = require("../controllers/disasterController");
const authMiddleware = require("../middleware/authMiddleware");


const router = Router();


router.get('/disasters', disasterController.getAllDisasters);
router.post('/disasters', authMiddleware, disasterController.createDisaster);
router.get('/disasters/:id', authMiddleware, disasterController.getDisasterById);
router.put('/disasters/:id', authMiddleware, disasterController.updateDisaster);
router.delete('/disasters/:id', authMiddleware, disasterController.deleteDisaster);

module.exports = router;
