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
import { CreateUserDto, MessagePatterns, USERS_SERVICE } from '@app/common';

@Controller('users')
export class UsersGatewayController {
  constructor(@Inject(USERS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll() {
    return this.client.send(MessagePatterns.Users.FindAll, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(MessagePatterns.Users.FindOne, id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.client.send(MessagePatterns.Users.Create, dto);
  }
}
