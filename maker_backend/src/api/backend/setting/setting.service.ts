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
   * Get all website options
   */
  async getWebsiteOptions(): Promise<{
    website_robots: Object;
    website_title: Object;
  }> {
    const website_robots = RobotEnum.LIST.get();
    const website_title = WebsiteTitleEnum.LIST.get();

    return { website_robots, website_title };
  }

  /**
   * Get all websites
   */
  async getWebsites(): Promise<{
    [key: string]: string;
  }> {
    const websites = await this.settingRepository.findByType(
      SettingEnum.WEBSITE,
    );

    return this.helper.convertToObject(websites, 'name', 'value');
  }

  /**
   * Update websites
   */
  async updateWebsites(body: any): Promise<{ items: { [key: string]: any } }> {
    this.settingRepository.updateSettings(body, SettingEnum.WEBSITE);

    return { items: body };
  }

  /**
   * Get all contacts
   */
  async getContacts(): Promise<{ [key: string]: string }> {
    const contacts = await this.settingRepository.findByType(
      SettingEnum.CONTACT,
    );

    return this.helper.convertToObject(contacts, 'name', 'value');
  }

  /**
   * Update contacts
   */
  async updateContacts(body: any): Promise<{ items: { [key: string]: any } }> {
    this.settingRepository.updateSettings(body, SettingEnum.CONTACT);

    return body;
  }
}
