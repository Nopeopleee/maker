import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/common/features/logger/logger.service';

@ApiTags('Frontend: Contents')
@Controller('frontend/contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
    private readonly logger: LoggerService,
  ) {}

  @Get('list/:alias')
  @ApiOperation({ summary: '取得內容列表' })
  async getContentsByAlias(@Param('alias') alias: string): Promise<any> {
    try {
      return await this.contentsService.getContentsByAlias(alias);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('inner/:alias')
  @ApiOperation({ summary: '取得文章內頁' })
  async getInnerContentsByAlias(@Param('alias') alias: string): Promise<any> {
    try {
      return await this.contentsService.getInnerContentsByAlias(alias);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
