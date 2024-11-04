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
import { AdminService } from './admin.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Dto
import { AdminDto } from './dto/admin.dto';
import { QueryDto } from 'src/common/dtos/query.dto';
import { AdminCreateDto } from './dto/admin-create.dto';
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

@ApiTags('Backend: Admin')
@UseGuards(JwtAdminGuard)
@ApiBearerAuth()
@Controller('backend/admins')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: AdminDto, isArray: true })
  async findByCondition(
    @Query() query: QueryDto,
    @Req() req: Request,
  ): Promise<{ items: AdminDto[]; data_count: number }> {
    try {
      query.id = req.admin.sub;
      return await this.adminService.findByCondition(query);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('options')
  @ApiOperation({ summary: 'Get all admin options' })
  @ApiResponse({ status: 200 })
  async findAllOptions(): Promise<any> {
    try {
      return await this.adminService.getOptions();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 201, type: IdDto })
  async createOne(
    @Body() data: AdminCreateDto,
    @Req() req: Request,
  ): Promise<{ id: number }> {
    try {
      return await this.adminService.create(data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one admin by id' })
  @ApiResponse({ status: 200, type: AdminDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AdminDto> {
    try {
      return await this.adminService.findById(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an admin' })
  @ApiResponse({ status: 200, type: IdDto })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AdminCreateDto,
    @Req() req: Request,
  ): Promise<{ id: number }> {
    try {
      return await this.adminService.update(id, data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete admins' })
  @ApiResponse({ status: 203 })
  @HttpCode(203)
  async deleteOne(@Body() data: DeleteDto, @Req() req: Request): Promise<void> {
    try {
      return await this.adminService.deleteMany(data.ids, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
