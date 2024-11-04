import { Module } from '@nestjs/common';
import { FileServiceController } from './file-service.controller';
import { FileServiceService } from './file-service.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';

@Module({
  controllers: [FileServiceController],
  providers: [FileServiceService, JwtService, JwtAdminGuard],
})
export class FileServiceModule {}
