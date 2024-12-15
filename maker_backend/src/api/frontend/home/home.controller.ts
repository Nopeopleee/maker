// Nestjs
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

// Service
import { HomeService } from './home.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Swagger
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Dto
import { HomepagesCreateDto } from 'src/api/backend/homepages/dto/homepages-create.dto';

@ApiTags('Frontend: Home')
@Controller('frontend/home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly logger: LoggerService,
  ) {}

  @Get('website-settings')
  @ApiOperation({ summary: '取得網站設定' })
  @ApiResponse({ status: 200, type: Object })
  async getWebsiteSettings(): Promise<any> {
    try {
      return await this.homeService.getWebsiteSettings();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':lang?/menu')
  @ApiParam({
    name: 'lang',
    required: false,
    description: '可不填, 語言預設為 zh-TW',
    example: 'zh-TW',
  })
  @ApiOperation({ summary: '取得選單' })
  @ApiResponse({ status: 200, type: Object })
  async getMenu(@Param('lang') lang: string = 'zh-TW'): Promise<any> {
    try {
      return await this.homeService.getMenu(lang);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':lang?/home')
  @ApiParam({
    name: 'lang',
    required: false,
    description: '可不填, 語言預設為 zh-TW',
    example: 'zh-TW',
  })
  @ApiOperation({ summary: '取得首頁資訊' })
  @ApiResponse({ status: 200, type: HomepagesCreateDto })
  async getHome(@Param('lang') lang: string = 'zh-TW'): Promise<any> {
    try {
      return await this.homeService.getHome(lang);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
