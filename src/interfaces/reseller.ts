import City from "./city";

export default interface Reseller {
  id: string;
  name: string;
  corporate_name: string;
  cnpj: string;
  im: string;

  address_cep: string;
  address_street: string;
  address_number: string;
  address_district: string;
  address_city: City;
  address_complement: string;

  responsible_name: string;
  responsible_email: string;
  responsible_phone: string;

  createdAt: Date;
  updatedAt: Date;

  bank_account_dv: string;
  bank_account_number: string;
  bank_agency_dv: string;
  bank_agency_number: string;
  bank_code: string;
  bank_pix: string;
  bank_type_pix: string;
}
