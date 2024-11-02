import { Router } from "express";
import dashboardController from "../controllers/dashboardController";
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/overview', authMiddleware, dashboardController.getOverview);
router.get('/chat-data', authMiddleware, dashboardController.getChartData);
