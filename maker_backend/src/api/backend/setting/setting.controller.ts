// Nestjs
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

// Service
import { SettingService } from './setting.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Swagger
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';
import { SettingsDto } from './dto/settings.dto';
import { SettingsUpdateDto } from './dto/settings-update.dto';

@ApiTags('Backend: Setting')
@ApiBearerAuth()
@UseGuards(JwtAdminGuard)
@Controller('backend/settings')
export class SettingController {
  constructor(
    private settingService: SettingService,
    private logger: LoggerService,
  ) {}

  @Get('websites')
  @ApiOperation({ summary: 'Get all websites' })
  @ApiResponse({ status: 200, type: Object })
  async getWebsites(): Promise<{ items: Object }> {
    try {
      return await this.settingService.getWebsites();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('websites')
  @ApiOperation({ summary: 'Update websites' })
  @ApiResponse({ status: 200, type: Object })
  async updateWebsites(
    @Body() body: SettingsUpdateDto,
  ): Promise<{ items: { [key: string]: any } }> {
    try {
      return await this.settingService.updateWebsites(body);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
