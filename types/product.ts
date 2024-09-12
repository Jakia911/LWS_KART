// /types/product.ts
export interface Product {
  id?: string;
  title: string;
  price?: number;
  description: string;
  category: string;
  image?: string;
  trending?: boolean;
  topArrival?: boolean;
}