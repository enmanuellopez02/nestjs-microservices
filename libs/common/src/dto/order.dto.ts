export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  total: number;
  createdAt: string;
}

export interface CreateOrderDto {
  userId: number;
  productId: number;
  quantity: number;
}
