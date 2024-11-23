import { Module } from '@nestjs/common';
import { LoginModule } from 'src/api/backend/login/login.module';
import { AdminModule } from 'src/api/backend/admin/admin.module';
import { HomeModule } from 'src/api/backend/home/home.module';
import { SettingModule } from 'src/api/backend/setting/setting.module';
import { OperationLogsModule } from 'src/api/backend/operation-logs/operation-logs.module';
import { HomepagesModule } from 'src/api/backend/homepages/homepages.module';
import { MenusModule } from 'src/api/backend/menus/menus.module';

const modules = [
  LoginModule,
  AdminModule,
  HomeModule,
  MenusModule,
  SettingModule,
  OperationLogsModule,
  HomeModule,
  HomepagesModule,
  SettingModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class BackendImportModule {}
