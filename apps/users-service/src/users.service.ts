import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, User } from '@app/common';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Luis', email: 'luis@tiendamia.com' },
    { id: 2, name: 'Ada', email: 'ada@tiendamia.com' },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  create(dto: CreateUserDto): User {
    const user: User = { id: this.nextId++, ...dto };
    this.users.push(user);
    return user;
  }
}
