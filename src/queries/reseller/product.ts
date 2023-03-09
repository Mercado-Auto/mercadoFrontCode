import {
  AddItemsProductToStockResponse,
  RemoveItemsProductFromStockResponse,
} from "./../../interfaces/response/reseller/product";
import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/reseller/product";
import {
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductResponse,
} from "src/interfaces/response/reseller/product";

export const useCreateProduct = (
  options?: UseMutationOptions<AxiosResponse<CreateProductResponse>>
) => {
  return useMutation(api.createProduct, options as any);
};

export const useDeleteProduct = (
  options?: UseMutationOptions<AxiosResponse<DeleteProductResponse>>
) => {
  return useMutation(api.deleteProduct, options as any);
};

export const useAddProductToStock = (
  options?: UseMutationOptions<AxiosResponse<AddItemsProductToStockResponse>>
) => {
  return useMutation(api.addItemsProductToStock, options as any);
};

export const useRemoveProductFromStock = (
  options?: UseMutationOptions<
    AxiosResponse<RemoveItemsProductFromStockResponse>
  >
) => {
  return useMutation(api.removeItemsProductFromStock, options as any);
};

export const useEditProduct = (
  options?: UseMutationOptions<AxiosResponse<UpdateProductResponse>>
) => {
  return useMutation(api.updateProduct, options as any);
};

export const useDeleteProductPhoto = (
  options?: UseMutationOptions<AxiosResponse<void>>
) => {
  return useMutation(api.deleteProductPhoto, options as any);
};

export const useReadProducts = (options: any) => {
  return useQuery(
    ["resellerProducts", options],
    () => api.readProducts(options),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useReadProduct = (id: string) => {
  return useQuery(["resellerProduct"], () => api.readProduct({ id }), {
    refetchOnWindowFocus: false,
  });
};
