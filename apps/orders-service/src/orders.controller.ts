import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto, MessagePatterns } from '@app/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(MessagePatterns.Orders.FindAll)
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern(MessagePatterns.Orders.Create)
  create(@Payload() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
