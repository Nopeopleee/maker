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
import { ContentDetailsCreateDto } from 'src/api/backend/contents/dto/content-details-create.dto';
import { ContentDetailsDto } from 'src/api/backend/contents/dto/content-details.dto';

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

    const include = {
      menu: {
        select: {
          title: true,
        },
      },
    };

    return await super.findByCondition(condition, searchInput, include);
  }

  /**
   * @description Get options
   * @returns any
   */
  async getOptions(): Promise<any> {
    const menu_list = await this.menus.findAll();

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

    const content = await prisma.$transaction(
      async (): Promise<ContentsDto> => {
        restData = plainToInstance(ContentsCreateDto, restData, {
          excludeExtraneousValues: true,
        });
        if (!restData.alias) restData.alias = this.helper.createAlias();
        const content = await super.createOrUpdate(restData, id);

        await prisma.content_details.deleteMany({
          where: {
            content_id: content.id,
          },
        });

        if (content_details && content_details.length > 0) {
          const newContentDetails = content_details.map((item) => {
            item.content_id = content.id;
            return plainToInstance(ContentDetailsCreateDto, item, {
              excludeExtraneousValues: true,
            });
          });

          await prisma.content_details.createMany({
            data: newContentDetails,
          });
        }

        const include = {
          content_details: true,
        };

        return await super.findById(content.id, include);
      },
    );

    return content;
  }

  async getArticleByAlias(alias: string): Promise<any> {
    const content = await prisma.contents.findFirst({
      where: {
        alias,
      },
      include: {
        content_details: true,
      },
    });

    return content;
  }
}
