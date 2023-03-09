import Section from "./section";
import Tag from "./tag";

export default interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sell_activated: boolean;
  sections: Section[];
  tags: Tag[];
  photos: string[];
  stock_quantity: number;
}
