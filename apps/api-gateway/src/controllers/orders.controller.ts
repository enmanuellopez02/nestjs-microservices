import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, MessagePatterns, ORDERS_SERVICE } from '@app/common';

@Controller('orders')
export class OrdersGatewayController {
  constructor(@Inject(ORDERS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll() {
    return this.client.send(MessagePatterns.Orders.FindAll, {});
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.client.send(MessagePatterns.Orders.Create, dto);
  }
}
