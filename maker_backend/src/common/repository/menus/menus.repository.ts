// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Dto
import { MenusDto } from 'src/api/backend/menus/dto/menus.dto';
import { MenusCreateDto } from 'src/api/backend/menus/dto/menus-create.dto';
import { ContentsCreateDto } from 'src/api/backend/contents/dto/contents-create.dto';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import MenuTypeEnum from 'src/common/enums/menu-type.enum';
import { plainToInstance } from 'class-transformer';
import { ContentsDto } from 'src/api/backend/contents/dto/contents.dto';

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

    if (child_menus && child_menus.length) {
      child_menus = child_menus
        .map((item) => {
          if (item.is_deleted && item.id) super.delete(item.id);
          else if (item.is_deleted) return null;
          else if (item.id) super.update(item.id, item);
          else {
            item.level = data.level + 1;
            item.type = data.type;
            delete item.parent_menu_id;

            return item;
          }
        })
        .filter((item) => item);

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

  /**
   * @description Get menus by language
   * @param language_id
   * @returns MenusDto[]
   */
  async getByLanguage(language_id: number): Promise<MenusDto[]> {
    const condition = {
      where: { language_id },
      orderBy: { order: 'asc' },
      select: {
        title: true,
        alias: true,
        image: true,
        type: true,
      },
    };

    return await super.findAll(condition);
  }

  async getMenuList(): Promise<any> {
    return this.helper.convertToOptions(
      await super.findAll(),
      'id',
      'title',
      null,
      'parent_menu_id',
    );
  }

  /**
   * @description 取得選單最大深度
   * @returns number
   */
  async getMaxDepth(): Promise<number> {
    return (await super.getMax('level')) || 0;
  }

  /**
   * @description 取得選單的文章列表
   * @param menu_alias
   * @returns CmsContentsDto
   */
  async getArticles(menu_alias: string): Promise<ContentsDto[]> {
    const include = {
      contents: {
        where: { status: true },
        select: {
          title: true,
          subtitle: true,
          description: true,
          alias: true,
          image: true,
        },
      },
    };

    const menu = (await super.findOne({ alias: menu_alias }, include)) as any;

    return menu.contents;
  }
}
