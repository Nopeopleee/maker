import { Module, Global } from '@nestjs/common';

import { AdminsRepository } from './admins/admins.repository';

import { HomepagesRepository } from './homepages/homepages.repository';
import { HomeBannersRepository } from './homepages/home-banners.repository';
import { HomeBlocksRepository } from './homepages/home-blocks.repository';
import { BlockDetailsRepository } from './homepages/block-details.repository';

import { PreviewsRepository } from './previews/previews.repository';
import { LanguagesRepository } from './languages/languages.repository';
import { SettingsRepository } from './settings/settings.repository';
import { MenuTypesRepository } from './menus/menu-types.repository';
import { MenusRepository } from './menus/menus.repository';

const repositories = [
  AdminsRepository,
  MenuTypesRepository,
  MenusRepository,
  HomepagesRepository,
  HomeBannersRepository,
  HomeBlocksRepository,
  BlockDetailsRepository,
  PreviewsRepository,
  LanguagesRepository,
  SettingsRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
