import { BaseGetResponse } from "../base";
import Product from "src/interfaces/product";

export interface ReadProductsResponse extends BaseGetResponse<Product> { }

export interface ReadProductResponse extends Product { }

export interface CreateProductResponse extends ReadProductResponse { }

export interface AddItemsProductToStockResponse { }

export interface RemoveItemsProductFromStockResponse { }

export interface DeleteProductResponse { }

export interface UpdateProductResponse { }
