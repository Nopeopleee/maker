// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { SettingsRepository } from 'src/common/repository/settings/settings.repository';

// enum
import SettingEnum from 'src/common/enums/setting.enum';
import RobotEnum from 'src/common/enums/robot.enum';
import { HelperService } from 'src/common/features/helper/helper.service';
import WebsiteTitleEnum from 'src/common/enums/website-title.enum';

@Injectable()
export class SettingService {
  constructor(
    private readonly settingRepository: SettingsRepository,
    private helper: HelperService,
  ) {}

  /**
   * Get all websites
   */
  async getWebsites(): Promise<{
    items: Object;
    website_robots: Object;
    website_title: Object;
  }> {
    const websites = await this.settingRepository.findByType(
      SettingEnum.WEBSITE,
    );

    const websiteObj = this.helper.convertToObject(websites, 'name', 'value');
    const website_robots = RobotEnum.LIST.get();
    const website_title = WebsiteTitleEnum.LIST.get();

    return { items: websiteObj, website_robots, website_title };
  }

  /**
   * Update websites
   */
  async updateWebsites(body: any): Promise<{ items: { [key: string]: any } }> {
    this.settingRepository.updateSettings(body, SettingEnum.WEBSITE);

    return { items: body };
  }
}
