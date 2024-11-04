import { Injectable } from '@nestjs/common';
import { HomepagesRepository } from 'src/common/repository/homepages/homepages.repository';
import { SettingsRepository } from 'src/common/repository/settings/settings.repository';
import SettingEnum from 'src/common/enums/setting.enum';
import { HelperService } from 'src/common/features/helper/helper.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly helper: HelperService,
    private readonly homepages: HomepagesRepository,
    private readonly settings: SettingsRepository,
  ) {}

  async getHome(lang: string): Promise<any> {
    const homepage = await this.homepages.getHomeByLanguage(lang);

    return homepage;
  }

  async getWebsiteSettings(): Promise<any> {
    const settings = await this.settings.findByType(SettingEnum.WEBSITE);

    return this.helper.convertToObject(settings, 'name', 'value');
  }
}
