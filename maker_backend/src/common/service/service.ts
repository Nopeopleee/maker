import { QueryDto } from 'src/common/dtos/query.dto';
import { AuditLogService } from '../features/audit-log/audit-log.service';

export class Service {
  constructor(
    private readonly entity: string,
    private readonly repository: any,
  ) {}

  private readonly auditLogService = new AuditLogService();

  /**
   * @description Find all entities by condition
   * @param QueryDto
   * @returns { items: any[]; data_count: number }
   */
  async findByCondition(
    query: QueryDto,
  ): Promise<{ items: any[]; data_count: number }> {
    return await this.repository.findByCondition(query);
  }

  /**
   * @description Find entity by id
   * @param id
   * @returns any
   */
  async findById(id: number): Promise<any> {
    return await this.repository.findById(id);
  }

  /**
   * @description Get all options
   * @returns any
   */
  async getOptions(): Promise<any> {
    return await this.repository.getOptions();
  }

  /**
   * @description Create entity
   * @param any
   * @returns any
   */
  async create(dto: any, req: any): Promise<any> {
    this.auditLogService.createAdminAuditLog({
      admin_id: req.admin.sub,
      action: 'create',
      message: `Create ${this.entity}: ${dto.name ?? dto[`${this.entity.slice(0, -1)}_details`]?.name ?? ''}`,
      ip: req.ip,
    });

    return await this.repository.createOrUpdate(dto);
  }

  /**
   * @description Update entity
   * @param any
   * @returns any
   */
  async update(id: number, dto: any, req: any): Promise<any> {
    this.auditLogService.createAdminAuditLog({
      admin_id: req.admin.sub,
      action: 'update',
      message: `Update ${this.entity}: ${dto.name ?? dto[`${this.entity.slice(0, -1)}_details`]?.name ?? ''}`,
      ip: req.ip,
    });

    return await this.repository.createOrUpdate(dto, id);
  }

  /**
   * @description Delete entities
   * @param id
   * @returns void
   */
  async deleteMany(ids: number[], req: any): Promise<void> {
    this.auditLogService.createAdminAuditLog({
      admin_id: req.admin.sub,
      action: 'delete',
      message: `Delete ${this.entity}: ${ids.join(',')}`,
      ip: req.ip,
    });

    return await this.repository.deleteMany(ids);
  }

  /**
   * @description Find first entity
   * @returns any
   */
  async findFirst(where: {} = {}): Promise<any> {
    return await this.repository.findFirst(where);
  }
}
