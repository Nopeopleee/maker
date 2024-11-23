import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/common/repository/users/users.repository';
import { Service } from 'src/common/service/service';

@Injectable()
export class UsersService extends Service {
  constructor(usersRepository: UsersRepository) {
    super('users', usersRepository);
  }
}
