import { Router } from "express";
import donationController from "../controllers/donationController";
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/donations', donationController.getAll);

router.post('/donations', donationMiddleware, donationController.create);
router.get('/donations', authMiddleware, donationController.getById);
router.put('/donations', authMiddleware, donationController.update);
router.delete('/donations', authMiddleware, donationController.delete);

export default router;