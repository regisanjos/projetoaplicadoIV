import { cpf, cnpj } from 'cpf-cnpj-validator';

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
