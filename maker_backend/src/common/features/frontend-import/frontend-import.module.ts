import { Module } from '@nestjs/common';
import { ContentsModule } from 'src/api/frontend/contents/contents.module';
import { HomeModule } from 'src/api/frontend/home/home.module';

const modules = [HomeModule, ContentsModule];

@Module({
  imports: modules,
  exports: modules,
})
export class FrontendImportModule {}
