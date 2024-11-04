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
import { MenuTypesService } from './menu-types.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Dto
import { MenuTypesDto } from './dto/menu-types.dto';
import { MenuTypesCreateDto } from './dto/menu-types-create.dto';
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

@ApiTags('Backend: Menu Types')
@UseGuards(JwtAdminGuard)
@ApiBearerAuth()
@Controller('backend/menu-types')
export class MenuTypesController {
  constructor(
    private readonly menuTypesService: MenuTypesService,
    private logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all menu types' })
  @ApiResponse({ status: 200, type: MenuTypesDto, isArray: true })
  async findByCondition(
    @Query() query: QueryDto,
    @Req() req: Request,
  ): Promise<{ items: MenuTypesDto[]; data_count: number }> {
    try {
      query.id = req.admin.sub;
      return await this.menuTypesService.findByCondition(query);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('options')
  @ApiOperation({ summary: 'Get all menu type options' })
  @ApiResponse({ status: 200 })
  async findAllOptions(): Promise<any> {
    try {
      return await this.menuTypesService.getOptions();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu type' })
  @ApiResponse({ status: 201, type: IdDto })
  async createOne(
    @Body() data: MenuTypesCreateDto,
    @Req() req: Request,
  ): Promise<{ id: number }> {
    try {
      return await this.menuTypesService.create(data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one menu type by id' })
  @ApiResponse({ status: 200, type: MenuTypesDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MenuTypesDto> {
    try {
      return await this.menuTypesService.findById(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu type' })
  @ApiResponse({ status: 200, type: IdDto })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MenuTypesCreateDto,
    @Req() req: Request,
  ): Promise<{ id: number }> {
    try {
      return await this.menuTypesService.update(id, data, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete menu types' })
  @ApiResponse({ status: 203 })
  @HttpCode(203)
  async deleteOne(@Body() data: DeleteDto, @Req() req: Request): Promise<void> {
    try {
      return await this.menuTypesService.deleteMany(data.ids, req);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
