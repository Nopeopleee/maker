import { Module } from '@nestjs/common';
import { MenuTypesService } from './menu-types.service';
import { MenuTypesController } from './menu-types.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MenuTypesController],
  providers: [MenuTypesService, JwtService],
})
export class MenuTypesModule {}
