// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

@Injectable()
export class LanguagesRepository extends Repository<any, any> {
  constructor() {
    super('languages');
  }

  /**
   * @description 用代碼取得語言
   * @param code
   * @returns any
   */
  async findByCode(code: string): Promise<any> {
    return await super.findByColumn('code', code);
  }
}
