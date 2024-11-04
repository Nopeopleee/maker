import { Module } from '@nestjs/common';
import { OperationLogsController } from './operation-logs.controller';
import { OperationLogsService } from './operation-logs.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';
import { OperationLogsRepository } from 'src/common/repository/operation-logs/operation-logs.repository';

@Module({
  controllers: [OperationLogsController],
  providers: [
    OperationLogsService,
    JwtService,
    JwtAdminGuard,
    OperationLogsRepository,
  ],
})
export class OperationLogsModule {}
