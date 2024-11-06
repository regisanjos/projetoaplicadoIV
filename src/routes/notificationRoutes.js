const { Router } = require('express');
const notificationService = require('../services/notificationService');
const authMiddleware = require('../middlewares/authMiddleware');




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

module.exports = router;
