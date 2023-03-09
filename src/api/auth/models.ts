import Reseller from "src/interfaces/reseller";

export enum UserType {
  // Cadastra usúario, e faz gestão da plataforma
  SYSADMIN = "sysadmin",
  // Não cadastra usúario, mas faz gestão da plataforma
  ADMIN = "admin",
  // Gestão da franquia
  RESELLER = "reseller",
  // Revendedor
  USER = "user",
}

export interface User {
  email: string;
  id: string;
  name: string;
  access_type: UserType;
  verified_email: boolean;

  /* IF [access_type === UserType.Reseller] */
  reseller?: Reseller;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface ConfirmEmailRequest {
  token: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface RegisterResponse {}

export interface RegisterRequest {
  name: string;
  corporate_name: string;
  cnpj: string;
  im: string;
  address_cep: string;
  address_street: string;
  address_city: string;
  address_number: string;
  address_district: string;
  address_complement: string;
  responsible_name: string;
  responsible_email: string;
  responsible_phone: string;
  responsible_password: string;
  bank_code: string;
  bank_agency_number: string;
  bank_agency_dv: string;
  bank_account_number: string;
  bank_account_dv: string;
  bank_type_pix: string;
  bank_pix: string;
}
