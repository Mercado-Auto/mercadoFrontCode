import Product from "src/interfaces/product";
import Pagination from "../pagination";

export interface CreateProductRequest extends Omit<Product, "id" | "sections" | "tags"> {
  sections: string[];
  tags: string[];
}

export interface AddItemsProductToStockRequest {
  product_id: string;
  quantity: number;
}

export interface RemoveItemsProductFromStockRequest {
  product_id: string;
  quantity: number;
}

export interface FilterProductRequest extends Partial<Omit<Product, "id">> { }

export interface ReadProductsRequest extends Pagination<FilterProductRequest> { }

export interface ReadProductRequest {
  id: string;
}

export interface UpdateProductRequest extends Partial<Omit<Product, "sections" | "tags">> {
  id: string;
  sections: string[];
  tags: string[];
}

export interface DeleteProductRequest {
  id: string;
}

export interface DeleteProductPhotoRequest {
  id: string;
  index: number;
}
