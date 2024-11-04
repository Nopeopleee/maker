// Nestjs
import { BadRequestException, Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { AdminDto } from 'src/api/backend/admin/dto/admin.dto';
import { AdminCreateDto } from 'src/api/backend/admin/dto/admin-create.dto';
import { QueryDto } from 'src/common/dtos/query.dto';

// Bcrypt
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsRepository extends Repository<AdminDto, AdminCreateDto> {
  constructor(private readonly helper: HelperService) {
    super('admins');
  }

  /**
   * @description Find admins by condition
   * @param condition
   * @returns { items: AdminDto[], data_count: number }
   */
  async findByCondition(
    condition: QueryDto,
    adminId: number,
  ): Promise<{ items: AdminDto[]; data_count: number }> {
    const { search } = condition;

    let searchInput: Object;

    if (adminId == 1) {
      searchInput = this.helper.convertWhereCondition({
        keywordOR: search,
        OR: ['email', 'name'],
      });
    } else {
      searchInput = this.helper.convertWhereCondition({
        keywordOR: search,
        OR: ['email', 'name'],
        keywordNOT: 1,
        NOT: 'id',
      });
    }

    return super.findByCondition(condition, searchInput);
  }

  /**
   * @description Create or update admin
   * @param data
   * @param id?
   * @returns ProductCategoriesDto
   */
  async createOrUpdate(data: AdminCreateDto): Promise<AdminDto>;
  async createOrUpdate(data: AdminCreateDto, id: number): Promise<AdminDto>;

  async createOrUpdate(data: AdminCreateDto, id = 0): Promise<AdminDto> {
    if (!id && !data.password) {
      throw new BadRequestException('Password is required');
    }

    if (data.password !== data.password_confirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    if (data.password_confirmation) {
      delete data.password_confirmation;
    }

    if (await this.findOneByEmail(data.email, id)) {
      throw new BadRequestException('Email already exists');
    }

    return super.createOrUpdate(data, id);
  }

  /**
   * @description Find one admin by email
   * @param email
   * @param id?
   * @returns AdminDto
   */
  async findOneByEmail(email: string, id?: number): Promise<AdminDto> {
    let where: Object;

    if (id) {
      where = { email, NOT: { id } };
    } else {
      where = { email };
    }

    return super.findOne(where);
  }
}
