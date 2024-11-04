import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HomeController],
  providers: [HomeService, JwtService],
})
export class HomeModule {}
