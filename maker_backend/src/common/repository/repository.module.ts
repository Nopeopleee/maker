import { Module, Global } from '@nestjs/common';

import { AdminsRepository } from './admins/admins.repository';

import { HomepagesRepository } from './homepages/homepages.repository';
import { HomeDetailsRepository } from './homepages/home-details.repository';

import { PreviewsRepository } from './previews/previews.repository';
import { LanguagesRepository } from './languages/languages.repository';
import { SettingsRepository } from './settings/settings.repository';
import { MenusRepository } from './menus/menus.repository';
import { UsersRepository } from './users/users.repository';
import { ContentsRepository } from './contents/contents.repository';

const repositories = [
  AdminsRepository,
  MenusRepository,
  HomepagesRepository,
  HomeDetailsRepository,
  PreviewsRepository,
  LanguagesRepository,
  SettingsRepository,
  UsersRepository,
  ContentsRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
