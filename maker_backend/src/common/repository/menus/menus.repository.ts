// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Dto

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import { MenusDto } from 'src/api/backend/menus/dto/menus.dto';
import { MenusCreateDto } from 'src/api/backend/menus/dto/menus-create.dto';
import MenuTypeEnum from 'src/common/enums/menu-type.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MenusRepository extends Repository<MenusDto, MenusCreateDto> {
  constructor(private readonly helper: HelperService) {
    super('menus');
  }

  /**
   * @description Find menus by condition
   * @param condition
   * @returns { items: MenusDto[], data_count: number }
   */
  async findByCondition(
    condition: any,
  ): Promise<{ items: MenusDto[]; data_count: number }> {
    const { search } = condition;

    const searchInput = this.helper.convertWhereCondition({
      keywordOR: search,
      OR: ['title'],
    });

    return await super.findByCondition(condition, searchInput);
  }

  /**
   * @description Get options
   * @returns any
   */
  async getOptions(): Promise<any> {
    const type_list = MenuTypeEnum.LIST.get();

    return { type_list };
  }

  /**
   * @description Find by id
   * @param id
   * @returns MenusDto
   */
  async findById(id: number): Promise<MenusDto> {
    const include = {
      child_menus: true,
    };

    return await super.findById(id, include);
  }

  /**
   * @description Create or update menu
   * @param data
   * @param id?
   * @returns MenusDto
   */
  async createOrUpdate(data: MenusCreateDto, id?: number): Promise<MenusDto> {
    data = plainToInstance(MenusCreateDto, data, {
      excludeExtraneousValues: true,
    });

    let { child_menus } = data;

    child_menus = child_menus
      .map((item) => {
        if (item.is_deleted && item.id) super.delete(item.id);
        else if (item.is_deleted) return null;
        else if (item.id) super.update(item.id, item);
        else {
          item.menu_type_id = data.menu_type_id;
          item.level = data.level + 1;
          item.type = data.type;
          delete item.parent_menu_id;

          return item;
        }
      })
      .filter((item) => item);

    if (child_menus.length) {
      data.child_menus = {
        connectOrCreate: child_menus.map((item) => ({
          create: item,
          where: { alias: item.alias },
        })),
      } as any;
    } else {
      delete data.child_menus;
    }

    return await super.createOrUpdate(data, id);
  }
}
