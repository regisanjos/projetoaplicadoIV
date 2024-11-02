import { body, param, validationResult } from 'express-validator';
import donationService from '../services/donationService';

const donationController = {
  // Validações para criar uma nova doação
  validate(method) {
    switch (method) {
      case 'createDonation': {
        return [
          body('userId').isInt().withMessage('O ID do usuário deve ser um número inteiro'),
          body('disasterId').isInt().withMessage('O ID do desastre deve ser um número inteiro'),
          body('items').isArray().withMessage('Os itens devem ser um array'),
          body('items.*.id').isInt().withMessage('O ID do item deve ser um número inteiro'),
          body('items.*.quantity').isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que zero'),
        ];
      }
      case 'getDonationById': {
        return [
          param('id').isInt().withMessage('O ID deve ser um número inteiro'),
        ];
      }
      case 'updateDonation': {
        return [
          param('id').isInt().withMessage('O ID deve ser um número inteiro'),
          body('userId').optional().isInt().withMessage('O ID do usuário deve ser um número inteiro'),
          body('disasterId').optional().isInt().withMessage('O ID do desastre deve ser um número inteiro'),
          body('items').optional().isArray().withMessage('Os itens devem ser um array'),
          body('items.*.id').optional().isInt().withMessage('O ID do item deve ser um número inteiro'),
          body('items.*.quantity').optional().isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que zero'),
        ];
      }
      case 'deleteDonation': {
        return [
          param('id').isInt().withMessage('O ID deve ser um número inteiro'),
        ];
      }
      default:
        return [];
    }
  },

  // Criar uma nova doação
  async create(req, res) {
    try {
      // Checa por erros de validação
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const donation = await donationService.createDonation(req.body);
      res.status(201).json(donation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar todas as doações
  async getAll(req, res) {
    try {
      const donations = await donationService.getAllDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar uma doação pelo ID
  async getById(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const donationId = parseInt(req.params.id);
      const donation = await donationService.getDonationById(donationId);
      res.json(donation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Atualizar uma doação
  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const donationId = parseInt(req.params.id);
      const updatedDonation = await donationService.updateDonation(donationId, req.body);
      res.json(updatedDonation);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  // Deletar uma doação
  async delete(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const donationId = parseInt(req.params.id);
      await donationService.deleteDonation(donationId);
      res.status(204).send();
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

getRecentDonations: async (req, res) =>{
  try{
    const limit =parseInt (req.query.limit) || 5;
    const recentDonations = await donationService.getRecentDonations(limit);
    res.json(recentDonations);
  }catch (erro){
    res.status(500).json({ erro: erro.message});
  }
},

};

export default donationController;