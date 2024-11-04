import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { LoggerService } from 'src/common/features/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SettingController],
  providers: [SettingService, LoggerService, JwtService],
})
export class SettingModule {}
