const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const donationExitRoutes = require('./routes/donationExitRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const etaRoutes = require('./routes/etaRoutes');
const errorHandler = require('./middleware/errorHandler');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const notificationRoutes = require('./routes/notificationRoutes');

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

module.exports = app;

