import { PrismaClient } from '@prisma/client';

import SettingEnum from '../../src/common/enums/setting.enum';

const prisma = new PrismaClient();

export const seedSetting = async () => {
  const APP_NAME = process.env.APP_NAME || 'NestJS';

  const data = [
    {
      type: SettingEnum.WEBSITE,
      name: 'website_meta_title',
      value: APP_NAME,
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_meta_desc',
      value: APP_NAME,
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_meta_key',
      value: APP_NAME,
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_meta_img',
      value: 'https://via.placeholder.com/150x150',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_robots',
      value: '4',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'google_trace_code',
      value: '',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'yahoo_trace_code',
      value: '',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'facebook_trace_code',
      value: '',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_title',
      value: APP_NAME,
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_add_title',
      value: '0',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_favicon',
      value: 'https://via.placeholder.com/16x16',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_logo',
      value: 'https://via.placeholder.com/64x64',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_offline',
      value: '0',
    },
    {
      type: SettingEnum.WEBSITE,
      name: 'website_offline_message',
      value: '網站維護中',
    },
  ];

  for (const setting of data) {
    await prisma.settings.upsert({
      where: { name: setting.name },
      update: { value: setting.value },
      create: {
        type: setting.type,
        name: setting.name,
        value: setting.value,
      },
    });
  }
};
