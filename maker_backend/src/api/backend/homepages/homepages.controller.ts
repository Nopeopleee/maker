// Nestjs
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

// Service
import { HomepagesService } from './homepages.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Dto
import { QueryDto } from 'src/common/dtos/query.dto';
import { IdDto } from 'src/common/dtos/id.dto';
import { DeleteDto } from 'src/common/dtos/delete.dto';
import { HomepagesDto } from './dto/homepages.dto';
import { HomepagesCreateDto } from './dto/homepages-create.dto';

// Swagger
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';

@ApiTags('Backend: Homepages')
@ApiBearerAuth()
@UseGuards(JwtAdminGuard)
@Controller('backend/homepages')
export class HomepagesController {
  constructor(
    private readonly homepagesService: HomepagesService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all homepages' })
  @ApiResponse({ status: 200, type: HomepagesDto, isArray: true })
  async findByCondition(
    @Query() query: QueryDto,
  ): Promise<{ items: HomepagesDto[]; data_count: number }> {
    try {
      return await this.homepagesService.findByCondition(query);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('options')
  @ApiOperation({ summary: 'Get all homepage options' })
  @ApiResponse({ status: 200 })
  async findAllOptions(): Promise<any> {
    try {
      return await this.homepagesService.getOptions();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new homepage' })
  @ApiResponse({ status: 201, type: IdDto })
  async createOne(
    @Body() data: HomepagesCreateDto,
    @Req() req: Request,
  ): Promise<HomepagesDto> {
    try {
      const result = await this.homepagesService.create(data, req);
      return result;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one homepage by id' })
  @ApiResponse({ status: 200, type: HomepagesDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<HomepagesDto> {
    try {
      return await this.homepagesService.findById(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an homepage',
    description: `要刪掉的 FAQ 請加上 <code>is_deleted: true</code> <br>
    <h3>範例:</h3>
    <pre><code>{
      &nbsp; "home_faqs": [{ "id": 1, "is_deleted": true, ... }]
    }</code></pre>`,
  })
  @ApiResponse({ status: 200, type: IdDto })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: HomepagesCreateDto,
    @Req() req: Request,
  ): Promise<HomepagesDto> {
    try {
      const result = await this.homepagesService.update(id, data, req);
      return result;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete homepages' })
  @ApiResponse({ status: 203 })
  @HttpCode(203)
  async delete(@Body() data: DeleteDto, @Req() req: Request): Promise<void> {
    try {
      await this.homepagesService.deleteMany(data.ids, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
