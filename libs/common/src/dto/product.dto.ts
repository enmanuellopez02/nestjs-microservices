export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
}
