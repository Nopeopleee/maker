// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { AdminsRepository } from 'src/common/repository/admins/admins.repository';

// Class Transformer
import { plainToClass } from 'class-transformer';

// Dto
import { AdminDto } from './dto/admin.dto';
import { QueryDto } from 'src/common/dtos/query.dto';

// Bcrypt
import { Service } from 'src/common/service/service';
import { HelperService } from 'src/common/features/helper/helper.service';
import { GenerateSnService } from 'src/common/features/generate-sn/generate-sn.service';

const repository = new AdminsRepository(
  new HelperService(new GenerateSnService()),
);

@Injectable()
export class AdminService extends Service {
  constructor(adminsRepository: AdminsRepository) {
    super('admins', adminsRepository);
  }

  /**
   * @description Find admins by condition
   * @param query
   * @returns { items: AdminDto[], data_count: number }
   */
  async findByCondition(
    query: QueryDto,
  ): Promise<{ items: AdminDto[]; data_count: number }> {
    const { id } = query;
    return await repository.findByCondition(query, id);
  }

  /**
   * @description Find admin by id
   * @param id
   * @returns AdminDto
   */
  async findById(id: number): Promise<AdminDto> {
    let admin = await super.findById(id);

    return plainToClass(AdminDto, admin);
  }

  /**
   * @description Find admin by email
   * @param email
   * @returns AdminDto
   */
  async findOneByEmail(email: string): Promise<AdminDto> {
    return await repository.findOneByEmail(email);
  }
}
