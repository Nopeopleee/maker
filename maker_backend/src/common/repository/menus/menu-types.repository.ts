// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Dto

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import { MenuTypesDto } from 'src/api/backend/menu-types/dto/menu-types.dto';
import { MenuTypesCreateDto } from 'src/api/backend/menu-types/dto/menu-types-create.dto';

@Injectable()
export class MenuTypesRepository extends Repository<
  MenuTypesDto,
  MenuTypesCreateDto
> {
  constructor(private readonly helper: HelperService) {
    super('menu_types');
  }

  /**
   * @description Find menu types by condition
   * @param condition
   * @returns { items: MenuTypesDto[], data_count: number }
   */
  async findByCondition(
    condition: any,
  ): Promise<{ items: MenuTypesDto[]; data_count: number }> {
    const { search } = condition;

    const searchInput = this.helper.convertWhereCondition({
      keywordOR: search,
      OR: ['name'],
    });

    return await super.findByCondition(condition, searchInput);
  }
}
