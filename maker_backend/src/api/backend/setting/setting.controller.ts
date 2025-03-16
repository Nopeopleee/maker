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

  @Get('websites/options')
  @ApiOperation({ summary: 'Get all website options' })
  @ApiResponse({ status: 200, type: Object })
  async getWebsiteOptions(): Promise<{
    website_robots: Object;
    website_title: Object;
  }> {
    try {
      return await this.settingService.getWebsiteOptions();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('websites')
  @ApiOperation({ summary: 'Get all websites' })
  @ApiResponse({ status: 200, type: Object })
  async getWebsites(): Promise<{ [key: string]: string }> {
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

  @Get('contacts')
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ status: 200, type: Object })
  async getContacts(): Promise<{ [key: string]: string }> {
    try {
      return await this.settingService.getContacts();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('contacts')
  @ApiOperation({ summary: 'Update contacts' })
  @ApiResponse({ status: 200, type: Object })
  async updateContacts(
    @Body() body: SettingsUpdateDto,
  ): Promise<{ items: { [key: string]: any } }> {
    try {
      return await this.settingService.updateContacts(body);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
