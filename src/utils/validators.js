import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidCPF = (cpf) => {
    return cpfValidator.isValid (cpf);
};

export const isValidCNPJ = (cnpj) => {
    return cpfValidator.isValid(cnpj);
};
