// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Prisma
import { PrismaClient } from '@prisma/client';

// Dto

// Services
import { HelperService } from 'src/common/features/helper/helper.service';
import { AuditLogDto } from 'src/common/features/audit-log/dto/audit-log.dto';
import { AuditLogCreateDto } from 'src/common/features/audit-log/dto/audit-log-create.dto';

const prisma = new PrismaClient();

@Injectable()
export class OperationLogsRepository extends Repository<
  AuditLogDto,
  AuditLogCreateDto
> {
  constructor(private readonly helperService: HelperService) {
    super('audit_logs');
  }

  /**
   * @description Find audit logs by condition
   * @param condition
   * @returns { items: AuditLogDto[], data_count: number }
   */
  async findByCondition(
    condition: any,
  ): Promise<{ items: AuditLogDto[]; data_count: number }> {
    const { search } = condition;

    const searchInput = {
      ...(search ? { message: { contains: search } } : {}),
    };

    const include = {
      admin: {
        select: {
          id: true,
          name: true,
        },
      },
    };

    let result = (await super.findByCondition(
      condition,
      searchInput,
      include,
    )) as any;

    result.items = result.items.map((item: AuditLogDto) => {
      return {
        ...item,
        action: this.helperService.getActionText(item.action),
      };
    }) as AuditLogDto[];

    return result;
  }
}
