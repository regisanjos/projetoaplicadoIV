const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const prisma = require('../config/db');
const Joi = require('joi');
const { generateRandomToken } = require('../utils/tokenUtils');
const sendEmail = require('../utils/sendEmail');

const authService = {
  async register(userData) {
    // Validação com Joi para incluir o campo "name"
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'Nome é obrigatório',
      }),
      email: Joi.string().email().required().messages({
        'string.empty': 'Email é obrigatório',
        'string.email': 'Email inválido',
      }),
      password: Joi.string().min(6).required().messages({
        'string.empty': 'Senha é obrigatória',
        'string.min': 'A senha deve ter pelo menos 6 caracteres',
      }),
    });

    const { error } = schema.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Este email já está em uso.');
    }

    // Criptografa a senha e cria o usuário
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name: userData.name, // Inclui o nome do usuário no banco de dados
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    // Remove a senha do objeto de retorno
    const { password, resetPasswordToken, resetPasswordTokenExpiry, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  },

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiration || '1h' });
    return token;
  },

  async forgotPassword(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const resetPasswordToken = generateRandomToken();
    const resetPasswordTokenExpiry = new Date(Date.now() + 3600000); // 1 hora para expirar

    await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordToken, resetPasswordTokenExpiry },
    });

    const resetPasswordLink = `http://seusite.com/redefinir-senha?token=${resetPasswordToken}`;
    await sendEmail(email, 'Recuperação de senha', `Clique no link para redefinir sua senha: ${resetPasswordLink}`);
  },

  async resetPassword(token, newPassword) {
    const passwordSchema = Joi.string().min(6).required().messages({
      'string.empty': 'A senha é obrigatória',
      'string.min': 'A senha deve ter pelo menos 6 caracteres',
    });

    const { error } = passwordSchema.validate(newPassword);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = await prisma.user.findUnique({ where: { resetPasswordToken: token } });
    if (!user || user.resetPasswordTokenExpiry < new Date()) {
      throw new Error('Token de redefinição de senha inválido ou expirado');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });
  },
};

module.exports = authService;
