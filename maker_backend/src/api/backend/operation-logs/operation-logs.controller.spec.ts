import { Test, TestingModule } from '@nestjs/testing';
import { OperationLogsController } from './operation-logs.controller';

describe('OperationLogsController', () => {
  let controller: OperationLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationLogsController],
    }).compile();

    controller = module.get<OperationLogsController>(OperationLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
