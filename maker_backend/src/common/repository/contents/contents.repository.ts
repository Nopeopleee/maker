// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';
import { LanguagesRepository } from '../languages/languages.repository';
import { MenusRepository } from '../menus/menus.repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import { plainToInstance } from 'class-transformer';

// Prisma
import { PrismaClient } from '@prisma/client';

// Dto
import { ContentsDto } from 'src/api/backend/contents/dto/contents.dto';
import { ContentsCreateDto } from 'src/api/backend/contents/dto/contents-create.dto';

// Enums

const prisma = new PrismaClient();

@Injectable()
export class ContentsRepository extends Repository<
  ContentsDto,
  ContentsCreateDto
> {
  constructor(
    private readonly helper: HelperService,
    private readonly languages: LanguagesRepository,
    private readonly menus: MenusRepository,
  ) {
    super('contents');
  }

  /**
   * @description Find contents by condition
   * @param condition
   * @returns { items: MenusDto[], data_count: number }
   */
  async findByCondition(
    condition: any,
  ): Promise<{ items: ContentsDto[]; data_count: number }> {
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
    const menu_list = await this.menus.getMenuList();
    return { menu_list };
  }

  /**
   * @description Find content by id
   * @param id
   * @returns ContentsDto
   */
  async findById(id: number): Promise<ContentsDto> {
    const include = {
      content_details: true,
    };

    let homepage = await super.findById(id, include);

    return homepage;
  }

  /**
   * @description Create or update content
   * @param data
   * @returns ContentsDto
   */
  async createOrUpdate(data: ContentsCreateDto, id = 0): Promise<ContentsDto> {
    let { content_details, ...restData } = data;

    // home_banners = plainToInstance(HomeBannersCreateDto, home_banners, {
    //   excludeExtraneousValues: true,
    // });
    // home_details = plainToInstance(HomeDetailsCreateDto, home_details, {
    //   excludeExtraneousValues: true,
    // });

    const content = await prisma.$transaction(
      async (): Promise<ContentsDto> => {
        restData = plainToInstance(ContentsCreateDto, restData, {
          excludeExtraneousValues: true,
        });
        const content = await super.createOrUpdate(restData, id);

        // home_banners.homepage_id = homepage.id;
        // this.homeBannersRepository.createOrUpdate(
        //   home_banners,
        //   home_banners.homepage_id,
        //   false,
        //   'homepage_id',
        // );

        // home_details.homepage_id = homepage.id;
        // this.homeDetailsRepository.createOrUpdate(
        //   home_details,
        //   home_details.homepage_id,
        //   false,
        //   'homepage_id',
        // );

        return content;
      },
    );

    return content;
  }
}
