import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuditLogDto } from './dto/audit-log.dto';
import { AuditLogCreateDto } from './dto/audit-log-create.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuditLogService {
  async createAdminAuditLog(data: AuditLogCreateDto): Promise<AuditLogDto> {
    return prisma.audit_logs.create({ data });
  }

  async getAuditLogs() {
    return prisma.audit_logs.findMany();
  }
}
