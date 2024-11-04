// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { SettingsDto } from 'src/api/backend/setting/dto/settings.dto';

@Injectable()
export class SettingsRepository extends Repository<SettingsDto, SettingsDto> {
  constructor(private readonly helperService: HelperService) {
    super('settings');
  }

  /**
   * @description 透過類型取得設定
   * @param type
   * @returns Promise<SettingsDto[]>
   */
  async findByType(type: number): Promise<SettingsDto[]> {
    return await super.findAll({ where: { type } });
  }

  /**
   * @description 透過名稱取得設定
   * @param name
   * @returns Promise<{ [key: string]: any }>
   */
  async findByName(name: Array<string>): Promise<{ [key: string]: any }> {
    const settings = await super.findAll({ where: { name: { in: name } } });

    return this.helperService.convertToObject(settings, 'name', 'value');
  }

  /**
   * @description 更新設定
   * @param body
   * @returns Promise<SettingsDto>
   */
  async updateSettings(data: {}, type: number): Promise<{}> {
    Object.keys(data).forEach(async (name) => {
      let temp = Object.create(null);
      temp.name = name;
      temp.value = data[name];
      temp.type = type;
      await super.createOrUpdate(temp, name, false, 'name');
    });

    return data;
  }
}
