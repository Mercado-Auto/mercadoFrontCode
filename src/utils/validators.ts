import { checkCNPJ } from "./check-cnpj";
import { checkCPF } from "./check-cpf";
import { checkIM } from "./check-im";

export const requiredSpecialChars = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!value.match(/[.,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,\]]/gm)) {
    return Promise.reject(new Error('Incluir caracteres especiais: .,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,]'));
  }
};

export const requiredUpperCaseLetters = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!value.match(/[A-Z]/gm)) {
    return Promise.reject(new Error('Incluir letras maiúsculas'));
  }
};

export const requiredLowerCaseLetters = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!value.match(/[a-z]/gm)) {
    return Promise.reject(new Error('Incluir letras minúsculas'));
  }
};

export const requiredNumericChars = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!value.match(/\d/gm)) {
    return Promise.reject(new Error('Incluir numéricos'));
  }
};

export const cnpj = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!checkCNPJ(value)) {
    return Promise.reject(new Error('CNPJ inválido!'));
  }
};

export const cpf = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!checkCPF(value)) {
    return Promise.reject(new Error('CPF inválido!'));
  }
};

export const im = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!checkIM(value)) {
    return Promise.reject(new Error('Inscrição municipal inválida!'));
  }
  return Promise.resolve();
};

export const cep = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!(/\d{5}-?\d{3}/gm.test(value))) {
    return Promise.reject(new Error('CEP inválido!'));
  }
  return Promise.resolve();
};

export const bankAgency = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!(/\d{4}/gm.test(value))) {
    return Promise.reject(new Error('Agência inválida!'));
  }
  return Promise.resolve();
};

export const bankAccount = (
  value?: string
) => {
  if (!value) {
    return Promise.resolve();
  }
  if (!(/\d{7}/gm.test(value))) {
    return Promise.reject(new Error('Conta inválida!'));
  }
  return Promise.resolve();
};

export type AllValidators = {
  requiredSpecialChars: typeof requiredSpecialChars,
  requiredUpperCaseLetters: typeof requiredUpperCaseLetters,
  requiredLowerCaseLetters: typeof requiredLowerCaseLetters,
  requiredNumericChars: typeof requiredNumericChars,
  cnpj: typeof cnpj,
  cpf: typeof cpf,
  im: typeof im,
  cep: typeof cep,
  bankAgency: typeof bankAgency,
  bankAccount: typeof bankAccount,
};

export const ALL_VALIDATORS: AllValidators = {
  requiredSpecialChars,
  requiredUpperCaseLetters,
  requiredLowerCaseLetters,
  requiredNumericChars,
  cnpj,
  cpf,
  im,
  cep,
  bankAgency,
  bankAccount,
};
