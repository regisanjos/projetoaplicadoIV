import { Router } from "express";
import donationController from "../controllers/donationController";
import authMiddleware from '../middleware/authMiddleware';

const router = Router();


router.get('/donations', donationController.getAll);
router.post('/donations', authMiddleware, donationController.create);
router.get('/donations/:id', authMiddleware, donationController.getById);
router.put('/donations/:id', authMiddleware, donationController.update);
router.delete('/donations/:id', authMiddleware, donationController.delete);
router.post('/', authMiddleware, donationController.validate('createDonation'), donationController.create
);

export default router;