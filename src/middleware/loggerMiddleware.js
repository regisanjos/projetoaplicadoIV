const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms - IP: ${req.ip} - User-Agent: ${req.headers['user-agent']}`);
    }
  });

  next();
};

module.exports = loggerMiddleware;
