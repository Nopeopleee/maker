import { Test, TestingModule } from '@nestjs/testing';
import { GenerateSnService } from './generate-sn.service';

describe('GenerateSnService', () => {
  let service: GenerateSnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateSnService],
    }).compile();

    service = module.get<GenerateSnService>(GenerateSnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
