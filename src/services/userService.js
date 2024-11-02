import prisma from '../config/db';
import bcrypt from 'bcryptjs'; // Para criptografar senhas

const userService = {
  // Criar um novo usuário
  async createUser(userData) {
    try {
      // 1. Verificar se o email já está em uso
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('Este email já está em uso.');
      }

      // 2. Criptografar a senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // 3. Criar o usuário no banco de dados (com a senha criptografada)
      const user = await prisma.user.create({
        data: { ...userData, password: hashedPassword },
      });

      return user;
    } catch (error) {
      // Tratar erros (como erros de validação ou de banco de dados)
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  },

  // Buscar todos os usuários (apenas para administradores)
  async getAllUsers(adminId) {
    try {
      // 1. Verificar se o usuário é administrador
      const admin = await this.getUserById(adminId);
      if (!admin || !admin.isAdmin) {
        throw new Error('Acesso negado: apenas administradores podem visualizar todos os usuários.');
      }

      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  },

  // Buscar um usuário pelo ID
  async getUserById(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  },

  // Atualizar um usuário
  async updateUser(userId, userData, requesterId) {
    try {
      // 1. Verificar se o usuário tem permissão para atualizar (ex: se é o próprio usuário ou um administrador)
      if (userId !== requesterId) {
        const requester = await this.getUserById(requesterId);
        if (!requester || !requester.isAdmin) {
          throw new Error('Acesso negado: você não tem permissão para atualizar este usuário.');
        }
      }

      // 2. Criptografar a nova senha, se fornecida
      if (userData.password) {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userData,
      });

      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  },

  // Deletar um usuário (apenas para administradores)
  async deleteUser(userId, adminId) {
    try {
      // 1. Verificar se o usuário é administrador
      const admin = await this.getUserById(adminId);
      if (!admin || !admin.isAdmin) {
        throw new Error('Acesso negado: apenas administradores podem deletar usuários.');
      }

      await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  },

  // Contar o número total de usuários
  async getTotalUsers() {
    try {
      const totalUsers = await prisma.user.count();
      return totalUsers;
    } catch (error) {
      throw new Error(`Erro ao contar usuários: ${error.message}`);
    }
  },

  // Verificar se um usuário é administrador
  async isAdmin(userId) {
    try {
      const user = await this.getUserById(userId);
      return user && user.isAdmin;
    } catch (error) {
      throw new Error(`Erro ao verificar status de administrador: ${error.message}`);
    }
  },
};

export default userService;