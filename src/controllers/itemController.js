import itemService from '../services/itemService';

const itemController = {
  // Criar um novo item
  async create(req, res) {
    try {
      const newItem = await itemService.createItem(req.body); // Cria um item com os dados recebidos
      res.status(201).json(newItem); // Retorna o item criado com status 201
    } catch (error) {
      res.status(500).json({ error: error.message }); // Trata erros e retorna mensagem de erro
    }
  },

  // Buscar todos os itens
  async getAll(req, res) {
    try {
      const items = await itemService.getAllItems(); // Busca todos os itens
      res.json(items); // Retorna a lista de itens
    } catch (error) {
      res.status(500).json({ error: error.message }); // Trata erros e retorna mensagem de erro
    }
  },

  // Buscar um item pelo ID
  async getById(req, res) {
    try {
      const itemId = parseInt(req.params.id); // Converte o ID para número
      const item = await itemService.getItemById(itemId); // Busca o item pelo ID
      res.json(item); // Retorna o item encontrado
    } catch (error) {
      res.status(404).json({ error: 'Item não encontrado' }); // Trata erro de item não encontrado
    }
  },

  // Atualizar um item
  async update(req, res) {
    try {
      const itemId = parseInt(req.params.id); // Converte o ID para número
      const updatedItem = await itemService.updateItem(itemId, req.body); // Atualiza o item com os novos dados
      res.json(updatedItem); // Retorna o item atualizado
    } catch (error) {
      res.status(500).json({ error: error.message }); // Trata erros e retorna mensagem de erro
    }
  },

  // Deletar um item
  async delete(req, res) {
    try {
      const itemId = parseInt(req.params.id); // Converte o ID para número
      await itemService.deleteItem(itemId); // Deleta o item pelo ID
      res.json({ message: 'Item deletado com sucesso' }); // Retorna mensagem de sucesso
    } catch (error) {
      res.status(500).json({ error: error.message }); // Trata erros e retorna mensagem de erro
    }
  },
};

export default itemController;