const authService = require("../services/authService");

const validateRequestBody = (fields, req, res) => {
  for (const field of fields) {
    if (!req.body[field] || req.body[field].trim() === "") {
      return res.status(400).json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório.` });
    }
  }
  return null;
};

const authController = {
  register: async (req, res) => {
    const validationError = validateRequestBody(['email', 'password'], req, res);
    if (validationError) return validationError;

    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        user
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const validationError = validateRequestBody(['email', 'password'], req, res);
    if (validationError) return validationError;

    try {
      const token = await authService.login(req.body.email, req.body.password);
      res.json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    const validationError = validateRequestBody(['email'], req, res);
    if (validationError) return validationError;

    try {
      await authService.forgotPassword(req.body.email);
      res.json({ message: 'Email de recuperação de senha enviado com sucesso' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    const validationError = validateRequestBody(['token', 'newPassword'], req, res);
    if (validationError) return validationError;

    try {
      await authService.resetPassword(req.body.token, req.body.newPassword);
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};

module.exports = authController;
