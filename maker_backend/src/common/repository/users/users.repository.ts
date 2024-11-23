// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { UsersDto } from 'src/api/backend/users/dto/users.dto';
import { UsersCreateDto } from 'src/api/backend/users/dto/users-create.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersRepository extends Repository<UsersDto, UsersCreateDto> {
  constructor(private readonly helper: HelperService) {
    super('users');
  }

  async findById(id: number): Promise<UsersDto> {
    const user = await super.findById(id);

    return plainToInstance(UsersDto, user, { excludeExtraneousValues: true });
  }

  async createOrUpdate(data: UsersCreateDto, id?: number): Promise<UsersDto> {
    if (data.password) {
      data.password = this.helper.hashPassword(data.password);
    }

    const user = await super.createOrUpdate(data, id);

    return plainToInstance(UsersDto, user, { excludeExtraneousValues: true });
  }
}
