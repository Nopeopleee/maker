import { Module } from '@nestjs/common';
import { HomeModule } from 'src/api/frontend/home/home.module';

const modules = [HomeModule];

@Module({
  imports: modules,
  exports: modules,
})
export class FrontendImportModule {}
