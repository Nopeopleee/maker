import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HomeService } from './home.service';
import { LoggerService } from 'src/common/features/logger/logger.service';
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';
import { Request } from 'express';

@ApiTags('Backend: Home')
@Controller('backend')
export class HomeController {
  constructor(
    private homeService: HomeService,
    private logger: LoggerService,
  ) {}

  @Get('check-login')
  @UseGuards(JwtAdminGuard)
  @ApiOperation({ summary: 'Check login' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async checkLogin(@Req() req: Request): Promise<any> {
    try {
      const admin = req.admin;
      return await this.homeService.checkTokenExpire(admin);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(
        'Oops! Something went wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
