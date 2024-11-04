import { Injectable } from '@nestjs/common';
import { OperationLogsRepository } from 'src/common/repository/operation-logs/operation-logs.repository';
import { Service } from 'src/common/service/service';

@Injectable()
export class OperationLogsService extends Service {
  constructor(operationLogsRepository: OperationLogsRepository) {
    super('operation logs', operationLogsRepository);
  }
}
