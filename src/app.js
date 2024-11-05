import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import donationRoutes from './routes/donationRoutes';
import disasterRoutes from './routes/disasterRoutes';
import donationExitRoutes from './routes/donationExitRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import etaRoutes from './routes/etaRoutes';
import errorHandler from './middleware/errorHandler';
import loggerMiddleware from './middleware/loggerMiddleware';
import notificationRoutes from './routes/notificationRoutes';
const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/disasters', disasterRoutes);
app.use('/api/donations-exit', donationExitRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/etas', etaRoutes);
app.use('/api', notificationRoutes);
app.use(errorHandler);

export default app;

