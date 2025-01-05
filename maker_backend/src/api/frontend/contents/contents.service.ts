import { Injectable } from '@nestjs/common';
import { ContentsRepository } from 'src/common/repository/contents/contents.repository';
import { MenusRepository } from 'src/common/repository/menus/menus.repository';

@Injectable()
export class ContentsService {
  constructor(
    private readonly menus: MenusRepository,
    private readonly contents: ContentsRepository,
  ) {}

  async getContentsByAlias(alias: string): Promise<any> {
    return this.menus.getArticles(alias);
  }

  async getInnerContentsByAlias(alias: string): Promise<any> {
    return this.contents.getArticleByAlias(alias);
  }
}
