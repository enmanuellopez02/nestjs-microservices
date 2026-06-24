import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, MessagePatterns } from '@app/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(MessagePatterns.Users.FindAll)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(MessagePatterns.Users.FindOne)
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(MessagePatterns.Users.Create)
  create(@Payload() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
