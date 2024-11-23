import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService, JwtService],
})
export class ContentsModule {}
