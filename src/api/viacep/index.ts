import axios from '..';
import { ViaCep } from './models';

export const viaCep = async (
  cep: string
) => {
  return await axios.get<ViaCep>(
    `https://viacep.com.br/ws/${ cep.replace('-', ``) }/json/`,
  );
}

export * from './models';
