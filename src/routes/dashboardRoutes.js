const { Router } = require("express");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateFilterOptions } = require("../middleware/validation");





const router = Router();

router.get('/overview', authMiddleware, dashboardController.getOverview);
router.get('/chat-data', authMiddleware, dashboardController.getChartData);

module.exports = router;

