import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateOrderDto,
  MessagePatterns,
  Order,
  PRODUCTS_SERVICE,
  Product,
  USERS_SERVICE,
  User,
} from '@app/common';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  findAll(): Order[] {
    return this.orders;
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const user = await firstValueFrom(
      this.usersClient.send<User>(MessagePatterns.Users.FindOne, dto.userId),
    );
    const product = await firstValueFrom(
      this.productsClient.send<Product>(
        MessagePatterns.Products.FindOne,
        dto.productId,
      ),
    );

    const order: Order = {
      id: this.nextId++,
      userId: user.id,
      productId: product.id,
      quantity: dto.quantity,
      total: product.price * dto.quantity,
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }
}
