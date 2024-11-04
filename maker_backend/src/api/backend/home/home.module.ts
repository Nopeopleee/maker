import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HomeController],
  providers: [HomeService, JwtService],
})
export class HomeModule {}
