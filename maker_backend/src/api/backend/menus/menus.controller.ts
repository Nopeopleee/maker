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
import { MenusService } from './menus.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Dto
import { MenusDto } from './dto/menus.dto';
import { MenusCreateDto } from './dto/menus-create.dto';
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

@ApiTags('Backend: Menus')
@UseGuards(JwtAdminGuard)
@ApiBearerAuth()
@Controller('backend/menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService,
    private logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, type: MenusDto, isArray: true })
  async findByCondition(
    @Query() query: QueryDto,
    @Req() req: Request,
  ): Promise<{ items: MenusDto[]; data_count: number }> {
    try {
      query.id = req.admin.sub;
      return await this.menusService.findByCondition(query);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('options')
  @ApiOperation({ summary: 'Get all menu options' })
  @ApiResponse({ status: 200 })
  async findAllOptions(): Promise<any> {
    try {
      return await this.menusService.getOptions();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 201, type: IdDto })
  async createOne(
    @Body() data: MenusCreateDto,
    @Req() req: Request,
  ): Promise<{ id: number }> {
    try {
      return await this.menusService.create(data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one menu by id' })
  @ApiResponse({ status: 200, type: MenusDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MenusDto> {
    try {
      return await this.menusService.findById(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu' })
  @ApiResponse({ status: 200, type: IdDto })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MenusCreateDto,
    @Req() req: Request,
  ): Promise<{ id: number }> {
    try {
      return await this.menusService.update(id, data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete menus' })
  @ApiResponse({ status: 203 })
  @HttpCode(203)
  async deleteOne(@Body() data: DeleteDto, @Req() req: Request): Promise<void> {
    try {
      return await this.menusService.deleteMany(data.ids, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
