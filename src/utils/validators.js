
const { cpf, cnpj } = require('cpf-cnpj-validator');
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidCPF = (cpfValue) => {
  return cpf.isValid(cpfValue);
};

export const isValidCNPJ = (cnpjValue) => {
  return cnpj.isValid(cnpjValue);
};

module.exports = validation;