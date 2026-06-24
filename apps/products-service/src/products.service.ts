import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, Product } from '@app/common';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Echo Dot', price: 49.99, stock: 100 },
    { id: 2, name: 'Kindle Paperwhite', price: 139.99, stock: 50 },
  ];
  private nextId = 3;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  create(dto: CreateProductDto): Product {
    const product: Product = { id: this.nextId++, ...dto };
    this.products.push(product);
    return product;
  }
}
