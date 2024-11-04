import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MenusController],
  providers: [MenusService, JwtService],
})
export class MenusModule {}
