const authService = require("../services/authService");

const validateRequestBody = (fields, body) => {
  for (const field of fields) {
    if (!body[field] || body[field].trim() === "") {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório.`;
    }
  }
  return null;
};

const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Ocorreu um erro inesperado.';
  res.status(statusCode).json({ error: message });
};

const authController = {
  register: async (req, res) => {
    const validationError = validateRequestBody(['email', 'password'], req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    try {
      const user = await authService.register(req.body);
      const { id, email, name } = user; // Evitar retornar informações sensíveis
      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        user: { id, email, name },
      });
    } catch (error) {
      console.error("Erro no registro de usuário:", error);
      handleError(res, error);
    }
  },

  login: async (req, res) => {
    const validationError = validateRequestBody(['email', 'password'], req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    try {
      const token = await authService.login(req.body.email, req.body.password);
      res.json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
      console.error("Erro no login:", error);
      handleError(res, error);
    }
  },

  forgotPassword: async (req, res) => {
    const validationError = validateRequestBody(['email'], req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    try {
      await authService.forgotPassword(req.body.email);
      res.json({ message: 'Email de recuperação de senha enviado com sucesso' });
    } catch (error) {
      console.error("Erro no envio de email de recuperação:", error);
      handleError(res, error);
    }
  },

  resetPassword: async (req, res) => {
    const validationError = validateRequestBody(['token', 'newPassword'], req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    try {
      await authService.resetPassword(req.body.token, req.body.newPassword);
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      console.error("Erro na redefinição de senha:", error);
      handleError(res, error);
    }
  },
};

module.exports = authController;
