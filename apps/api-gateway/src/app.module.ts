import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDERS_SERVICE,
  PRODUCTS_SERVICE,
  USERS_SERVICE,
} from '@app/common';
import { UsersGatewayController } from './controllers/users.controller';
import { ProductsGatewayController } from './controllers/products.controller';
import { OrdersGatewayController } from './controllers/orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICE_HOST || 'localhost',
          port: Number(process.env.USERS_SERVICE_PORT) || 3001,
        },
      },
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCTS_SERVICE_HOST || 'localhost',
          port: Number(process.env.PRODUCTS_SERVICE_PORT) || 3002,
        },
      },
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.ORDERS_SERVICE_HOST || 'localhost',
          port: Number(process.env.ORDERS_SERVICE_PORT) || 3003,
        },
      },
    ]),
  ],
  controllers: [
    UsersGatewayController,
    ProductsGatewayController,
    OrdersGatewayController,
  ],
})
export class AppModule {}
