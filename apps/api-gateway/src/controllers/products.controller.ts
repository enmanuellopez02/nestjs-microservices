import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  MessagePatterns,
  PRODUCTS_SERVICE,
} from '@app/common';

@Controller('products')
export class ProductsGatewayController {
  constructor(@Inject(PRODUCTS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll() {
    return this.client.send(MessagePatterns.Products.FindAll, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(MessagePatterns.Products.FindOne, id);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.client.send(MessagePatterns.Products.Create, dto);
  }
}
