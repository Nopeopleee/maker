// Nestjs
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';

// Service
import { OperationLogsService } from './operation-logs.service';

// Swagger
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';

// Dto
import { QueryDto } from 'src/common/dtos/query.dto';
import { AuditLogDto } from 'src/common/features/audit-log/dto/audit-log.dto';

@ApiTags('Backend: Operation Logs')
@ApiBearerAuth()
@UseGuards(JwtAdminGuard)
@Controller('backend/operation-logs')
export class OperationLogsController {
  constructor(private operationLogsService: OperationLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all operation logs' })
  @ApiResponse({ status: 200, type: AuditLogDto, isArray: true })
  async findByCondition(
    @Query() query: QueryDto,
  ): Promise<{ items: any[]; data_count: number }> {
    try {
      const result = await this.operationLogsService.findByCondition(query);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
