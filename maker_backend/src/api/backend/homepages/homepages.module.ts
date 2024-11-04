import { Module } from '@nestjs/common';
import { HomepagesService } from './homepages.service';
import { HomepagesController } from './homepages.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HomepagesController],
  providers: [HomepagesService, JwtService],
})
export class HomepagesModule {}
