const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const disasterRoutes = require('./routes/disasterRoutes');
const donationExitRoutes = require('./routes/donationExitRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const etaRoutes = require('./routes/etaRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middlewares/errorHandler');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Tratamento de JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next();
});

// Rotas
const apiBase = '/api/v1';
app.use(`${apiBase}/auth`, authRoutes);
app.use(`${apiBase}/users`, userRoutes);
app.use(`${apiBase}/donations`, donationRoutes);
app.use(`${apiBase}/disasters`, disasterRoutes);
app.use(`${apiBase}/donations-exit`, donationExitRoutes);
app.use(`${apiBase}/dashboard`, dashboardRoutes);
app.use(`${apiBase}/etas`, etaRoutes);
app.use(`${apiBase}/notifications`, notificationRoutes);

// Rota padrão para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento de erros
app.use(errorHandler);

module.exports = app;
