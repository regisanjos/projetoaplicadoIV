const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const userService = {
  
  validateUserData(userData) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': 'O email é obrigatório',
        'string.email': 'Formato de email inválido',
      }),
      password: Joi.string().min(6).optional().messages({
        'string.min': 'A senha deve ter pelo menos 6 caracteres',
      }),
      name: Joi.string().required().messages({
        'string.empty': 'O nome é obrigatório',
      }),
    });

    const { error } = schema.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },

  
  sanitizeUser(user) {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  },

  
  async createUser(userData) {
    this.validateUserData(userData);

    
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error('Este email já está em uso.');
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    return this.sanitizeUser(user);
  },

  
  async getAllUsers(adminId) {
    if (!(await this.isAdmin(adminId))) {
      throw new Error('Acesso negado: apenas administradores podem visualizar todos os usuários.');
    }

    const users = await prisma.user.findMany();
    return users.map(this.sanitizeUser);
  },

  
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.sanitizeUser(user);
  },

  
  async updateUser(userId, userData, requesterId) {
    if (userId !== requesterId && !(await this.isAdmin(requesterId))) {
      throw new Error('Acesso negado: você não tem permissão para atualizar este usuário.');
    }

    this.validateUserData(userData);

    
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userData,
      });
      return this.sanitizeUser(updatedUser);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Usuário não encontrado para atualização');
      }
      throw error;
    }
  },

  
  async deleteUser(userId, adminId) {
    if (!(await this.isAdmin(adminId))) {
      throw new Error('Acesso negado: apenas administradores podem deletar usuários.');
    }

    try {
      await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Usuário não encontrado para deleção');
      }
      throw error;
    }
  },

  
  async getTotalUsers() {
    return await prisma.user.count();
  },

  
  async isAdmin(userId) {
    const user = await this.getUserById(userId);
    return user && user.role === 'ADMIN';
  },
};

module.exports = userService;
