const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production'
      ? 'Erro interno do servidor'
      : err.message || 'Erro interno do servidor';
  
    // Retorna um erro de validação, se disponível
    if (err.errors && err.errors.length > 0) {
      return res.status(400).json({ errors: err.errors });
    }
  
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = errorHandler;
  