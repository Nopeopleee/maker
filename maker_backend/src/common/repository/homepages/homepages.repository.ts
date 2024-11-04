// Nestjs
import { BadRequestException, Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';
import { HomeBannersRepository } from './home-banners.repository';
import { BlockDetailsRepository } from './block-details.repository';
import { HomeBlocksRepository } from './home-blocks.repository';
import { LanguagesRepository } from '../languages/languages.repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import { plainToInstance } from 'class-transformer';

// Prisma
import { PrismaClient } from '@prisma/client';

// Dto
import { HomepagesDto } from 'src/api/backend/homepages/dto/homepages.dto';
import { HomepagesCreateDto } from 'src/api/backend/homepages/dto/homepages-create.dto';
import { HomeBannersCreateDto } from 'src/api/backend/homepages/dto/home-banners-create.dto';
import { HomeBlocksCreateDto } from 'src/api/backend/homepages/dto/home-blocks-create.dto';
import { BlockDetailsCreateDto } from 'src/api/backend/homepages/dto/block-details-create.dto';

const prisma = new PrismaClient();

@Injectable()
export class HomepagesRepository extends Repository<
  HomepagesDto,
  HomepagesCreateDto
> {
  constructor(
    private readonly helper: HelperService,
    private readonly homeBanners: HomeBannersRepository,
    private readonly homeBlocks: HomeBlocksRepository,
    private readonly blockDetails: BlockDetailsRepository,
    private readonly languages: LanguagesRepository,
  ) {
    super('homepages');
  }

  /**
   * @description Find homepage by id
   * @param id
   * @returns HomepagesDto
   */
  async findById(id: number): Promise<HomepagesDto> {
    const include = {
      home_banners: true,
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
    let { home_banners, ...restData } = data;

    home_banners = plainToInstance(HomeBannersCreateDto, home_banners, {
      excludeExtraneousValues: true,
    });
    // home_details = plainToInstance(HomeDetailsCreateDto, home_details, {
    //   excludeExtraneousValues: true,
    // });

    const homepage = await prisma.$transaction(
      async (): Promise<HomepagesDto> => {
        restData = plainToInstance(HomepagesCreateDto, restData, {
          excludeExtraneousValues: true,
        });
        const homepage = await super.createOrUpdate(restData, id);

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

        return homepage;
      },
    );

    return homepage;
  }

  /**
   * @description 取得首頁資訊
   * @param id
   * @returns HomepagesDto
   */
  async getHomeByLanguage(langCode: string): Promise<HomepagesDto> {
    const language = await this.languages.findByCode(langCode);
    if (!language) throw new BadRequestException(`Language not found`);

    const where = {
      language_id: language.id,
      status: true,
    };

    const exclude = {
      id: false,
      homepage_id: false,
      created_at: false,
      updated_at: false,
    };

    const include = {
      id: false,
      language_id: false,
      type: false,
      status: false,
      created_at: false,
      updated_at: false,
      home_banners: { include: exclude },
      home_blocks: { include: { ...exclude, block_details: true } },
    };

    let homepage = await super.findFirst(where, include);

    if (!homepage) throw new BadRequestException(`Homepage not found`);

    return homepage;
  }
}
