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

// Service
import { ContentsService } from './contents.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Dto
import { ContentsDto } from './dto/contents.dto';
import { ContentsCreateDto } from './dto/contents-create.dto';
import { QueryDto } from 'src/common/dtos/query.dto';
import { IdDto } from 'src/common/dtos/id.dto';
import { DeleteDto } from 'src/common/dtos/delete.dto';

// Swagger
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';

// Express
import { Request } from 'express';

@ApiTags('Backend: Contents')
@UseGuards(JwtAdminGuard)
@ApiBearerAuth()
@Controller('backend/contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
    private logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: ContentsDto, isArray: true })
  async findByCondition(
    @Query() query: QueryDto,
    @Req() req: Request,
  ): Promise<{ items: ContentsDto[]; data_count: number }> {
    try {
      query.id = req.admin.sub;
      return await this.contentsService.findByCondition(query);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('options')
  @ApiOperation({ summary: 'Get all user options' })
  @ApiResponse({ status: 200 })
  async findAllOptions(): Promise<any> {
    try {
      return await this.contentsService.getOptions();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: IdDto })
  async createOne(
    @Body() data: ContentsCreateDto,
    @Req() req: Request,
  ): Promise<ContentsDto> {
    try {
      return await this.contentsService.create(data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: ContentsDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContentsDto> {
    try {
      return await this.contentsService.findById(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, type: IdDto })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ContentsCreateDto,
    @Req() req: Request,
  ): Promise<ContentsDto> {
    try {
      return await this.contentsService.update(id, data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete users' })
  @ApiResponse({ status: 203 })
  @HttpCode(203)
  async deleteOne(@Body() data: DeleteDto, @Req() req: Request): Promise<void> {
    try {
      return await this.contentsService.deleteMany(data.ids, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
