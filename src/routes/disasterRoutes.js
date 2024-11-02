import { Router } from "express";
import disasterController from '../controllers/disasterController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();


router.get('/disasters', disasterController.getAllDisasters);
router.post('/disasters', authMiddleware, disasterController.createDisaster);
router.get('/disasters/:id', authMiddleware, disasterController.getDisasterById);
router.put('/disasters/:id', authMiddleware, disasterController.updateDisaster);
router.delete('/disasters/:id', authMiddleware, disasterController.deleteDisaster);

export default router;
