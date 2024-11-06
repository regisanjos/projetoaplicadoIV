const { cpf, cnpj } = require('cpf-cnpj-validator');


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const isValidCPF = (cpfValue) => {
  return cpf.isValid(cpfValue);
};


const isValidCNPJ = (cnpjValue) => {
  return cnpj.isValid(cnpjValue);
};

module.exports = {
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
};
