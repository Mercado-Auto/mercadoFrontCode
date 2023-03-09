import {
  AddItemsProductToStockResponse,
  RemoveItemsProductFromStockResponse,
} from "./../../interfaces/response/reseller/product";
import {
  AddItemsProductToStockRequest,
  RemoveItemsProductFromStockRequest,
} from "./../../interfaces/request/reseller/product";
import axios from "..";

import {
  CreateProductRequest,
  ReadProductsRequest,
  ReadProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  DeleteProductPhotoRequest,
} from "src/interfaces/request/reseller/product";

import {
  ReadProductsResponse,
  ReadProductResponse,
  CreateProductResponse,
} from "src/interfaces/response/reseller/product";
import { AxiosResponse } from "axios";

export const createProduct = async (
  data: CreateProductRequest
): Promise<CreateProductResponse> => {
  const { data: retval } = await axios.post<
    CreateProductRequest,
    AxiosResponse<CreateProductResponse>
  >(`/products`, data);

  return retval;
};

export const readProducts = async (
  options: ReadProductsRequest
): Promise<ReadProductsResponse> => {
  const { data } = await axios.get<
    ReadProductsRequest,
    AxiosResponse<ReadProductsResponse>
  >(`/products`, {
    params: {
      ...options,
      ...(options.filters && Object.keys(options.filters).length
        ? { filters: JSON.stringify(options.filters) }
        : { filters: {} }),
    },
  });

  return data;
};

export const readProduct = async ({
  id,
}: ReadProductRequest): Promise<ReadProductResponse> => {
  const { data: retval } = await axios.get<
    ReadProductRequest,
    AxiosResponse<ReadProductResponse>
  >(`/products/${id}`);
  retval.stock_quantity = Number(retval.stock_quantity) || 0;
  return retval;
};

export const updateProduct = async ({
  id,
  ...data
}: UpdateProductRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateProductRequest,
    AxiosResponse<void>
  >(`/products/${id}`, data);
  return retval;
};

export const deleteProduct = async ({
  id,
}: DeleteProductRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteProductRequest,
    AxiosResponse<void>
  >(`/products/${id}`);
  return retval;
};

export const deleteProductPhoto = async ({
  id,
  index,
}: DeleteProductPhotoRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteProductRequest,
    AxiosResponse<void>
  >(`/products/${id}/photo/${index}`);
  return retval;
};

export const addItemsProductToStock = async (
  data: AddItemsProductToStockRequest
): Promise<void> => {
  const { data: retval } = await axios.patch<
    AddItemsProductToStockResponse,
    AxiosResponse<void>
  >(`/products/stock`, data);
  return retval;
};

export const removeItemsProductFromStock = async ({
  product_id,
  quantity,
}: RemoveItemsProductFromStockRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    RemoveItemsProductFromStockResponse,
    AxiosResponse<void>
  >(`/products/stock/${product_id}/${quantity}`);
  return retval;
};
