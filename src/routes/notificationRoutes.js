// backend/src/routes/notificationRoutes.js
import { Router } from 'express';
import notificationService from '../services/notificationService';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const notifications = await notificationService.getUserNotifications(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
