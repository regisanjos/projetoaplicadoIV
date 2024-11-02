import { query, validationResult } from 'express-validator';

export const validateFilterOptions = [
  query('status')
    .optional()
    .isIn(['PENDING', 'APPROVED', 'REJECTED'])
    .withMessage('Status inválido. Valores válidos: PENDING, APPROVED, REJECTED'),
    
  query('disasterId')
    .optional()
    .isInt()
    .withMessage('O ID do desastre deve ser um número inteiro'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
