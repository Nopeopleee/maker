import { Test, TestingModule } from '@nestjs/testing';
import { MenuTypesService } from './menu-types.service';

describe('MenuTypesService', () => {
  let service: MenuTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuTypesService],
    }).compile();

    service = module.get<MenuTypesService>(MenuTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
