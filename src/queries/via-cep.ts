import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { ViaCep, viaCep as viaCepHandler } from 'src/api/viacep';


export const useViaCep = (options?: UseMutationOptions<AxiosResponse<ViaCep>>) => {
  return useMutation(
    viaCepHandler,
    options as any
  );
}
