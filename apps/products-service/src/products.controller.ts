import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto, MessagePatterns } from '@app/common';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(MessagePatterns.Products.FindAll)
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern(MessagePatterns.Products.FindOne)
  findOne(@Payload() id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern(MessagePatterns.Products.Create)
  create(@Payload() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
}
