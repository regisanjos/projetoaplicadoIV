import authService from "../Services/authService";

const validateRequestBody = (fields, req, res) => {
  for (const field of fields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório.` });
    }
  }
  return null;
};

const authController = {
  register: async (req, res) => {
    try {
      const validationError = validateRequestBody(['email', 'password'], req, res);
      if (validationError) return validationError;

      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const validationError = validateRequestBody(['email', 'password'], req, res);
      if (validationError) return validationError;

      const token = await authService.login(req.body.email, req.body.password);
      res.json({ token });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const validationError = validateRequestBody(['email'], req, res);
      if (validationError) return validationError;

      await authService.forgotPassword(req.body.email);
      res.json({ message: 'Email de recuperação de senha enviado' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const validationError = validateRequestBody(['token', 'newPassword'], req, res);
      if (validationError) return validationError;

      await authService.resetPassword(req.body.token, req.body.newPassword);
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};

export default authController;