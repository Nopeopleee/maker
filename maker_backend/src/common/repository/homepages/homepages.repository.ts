// Nestjs
import { BadRequestException, Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';
import { HomeDetailsRepository } from './home-details.repository';
import { MenusRepository } from '../menus/menus.repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import { plainToInstance } from 'class-transformer';

// Dto
import { HomepagesDto } from 'src/api/backend/homepages/dto/homepages.dto';
import { HomepagesCreateDto } from 'src/api/backend/homepages/dto/homepages-create.dto';
import { HomeDetailsCreateDto } from 'src/api/backend/homepages/dto/home-details-create.dto';

// Enums
import HomepageTypeEnum from 'src/common/enums/homepage-type.enum';

@Injectable()
export class HomepagesRepository extends Repository<
  HomepagesDto,
  HomepagesCreateDto
> {
  constructor(
    private readonly helper: HelperService,
    private readonly homeDetails: HomeDetailsRepository,
    private readonly menus: MenusRepository,
  ) {
    super('homepages');
  }

  /**
   * @description Find homepages by condition
   * @param condition
   * @returns { items: MenusDto[], data_count: number }
   */
  async findByCondition(
    condition: any,
  ): Promise<{ items: HomepagesDto[]; data_count: number }> {
    const { search } = condition;

    const searchInput = this.helper.convertWhereCondition({
      keywordOR: search,
      OR: ['title'],
    });

    const include = {
      home_details: true,
    };

    return await super.findByCondition(condition, searchInput, include);
  }

  /**
   * @description Get options
   * @returns any
   */
  async getOptions(): Promise<any> {
    const type_list = HomepageTypeEnum.LIST.get();
    const menu_list = await this.menus.getMenuList();

    return { type_list, menu_list };
  }

  /**
   * @description Find homepage by id
   * @param id
   * @returns HomepagesDto
   */
  async findById(id: number): Promise<HomepagesDto> {
    const include = {
      home_details: true,
    };

    let homepage = await super.findById(id, include);

    return homepage;
  }

  /**
   * @description Create or update member
   * @param data
   * @returns HomepagesDto
   */
  async createOrUpdate(
    data: HomepagesCreateDto,
    id = 0,
  ): Promise<HomepagesDto> {
    let { home_details, ...restData } = data;

    home_details = plainToInstance(HomeDetailsCreateDto, home_details, {
      excludeExtraneousValues: true,
    });

    restData = plainToInstance(HomepagesCreateDto, restData, {
      excludeExtraneousValues: true,
    });

    const homepage = await super.createOrUpdate(restData, id);

    home_details.homepage_id = homepage.id;
    home_details.type = homepage.type;
    const homeDetails = await this.homeDetails.createOrUpdate(
      home_details,
      home_details.homepage_id,
      false,
      'homepage_id',
    );

    return { ...homepage, home_details: homeDetails };
  }

  /**
   * @description Get homepages by language
   * @param language_id
   * @returns HomepagesDto[]
   */
  async getByLanguage(language_id: number): Promise<HomepagesDto[]> {
    const condition = {
      where: { language_id },
      orderBy: { order: 'asc' },
      select: {
        menu_id: true,
        type: true,
        home_details: true,
        menu: { select: { contents: true } },
      },
    };

    return await super.findAll(condition);
  }
}
