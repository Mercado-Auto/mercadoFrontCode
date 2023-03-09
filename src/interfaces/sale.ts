import Customer from "./customer";
import Product from "./product";

export enum SaleStatus {
  WAITING_PAYMENT = "waiting_payment",
  SEPARATING_ORDER = "separating_order",
  WAITING_PICKUP = "waiting_pickup",
  CANCELED = "canceled",
  DELIVERY_TRANSIT = "delivery_transit",
  DELIVERED = "delivered",
}

export interface SaleQuantityProduct {
  product_id: string;
  quantity: number;
}

interface City {
  createdAt: string;
  id: string;
  name: string;
  uf: string;
  updatedAt: string;
}

export interface ShippingAddress {
  cep: string;
  complement: string;
  createdAt: string;
  district: string;
  id: string;
  number: string;
  street: string;
  updatedAt: string;
  city: City;
}

export default interface Sale {
  id: string;
  quantity_products: SaleQuantityProduct[];
  amount: number;
  status: SaleStatus;
  payment_tid: string;
  payment_nsu: string;
  tracker_code: string;
  payment_auth_code: string;
  payment_id: string;
  payment_st_code: string;
  payment_st_msg: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  customer: Customer;
  shipping_address: ShippingAddress;
  pickup_in_store: boolean;
  nf_link: string;
}
