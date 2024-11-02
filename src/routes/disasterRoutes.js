import { Router } from "express";
import disasterController from '../controllers/disasterController';
import authMiddleware from '../middleware/authController';

const router = Router();

router.get('/disaster', disasterController.getAllDisasters);

router.post('/disasters', authMiddleware, disasterController.createDisaster );
router.get('/disaster/:id', authMiddleware, disasterController.getDisasterById);
router.put('/disaster/:id', authMiddleware, disasterController.updateDisaster);
router.delete('/disaster/:id', authMiddleware, disasterController.deleteDisaster);

export default router;