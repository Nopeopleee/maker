import { Test, TestingModule } from '@nestjs/testing';
import { HomepagesService } from './homepages.service';

describe('HomepagesService', () => {
  let service: HomepagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomepagesService],
    }).compile();

    service = module.get<HomepagesService>(HomepagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
