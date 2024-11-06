const { Router } = require("express");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateFilterOptions } = require("../middlewares/validation");





const router = Router();

router.get('/overview', authMiddleware, dashboardController.getOverview);
router.get('/chat-data', authMiddleware, dashboardController.getChartData);

module.exports = router;

