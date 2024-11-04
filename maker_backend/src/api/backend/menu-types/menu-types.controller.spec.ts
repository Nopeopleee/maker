import { Test, TestingModule } from '@nestjs/testing';
import { MenuTypesController } from './menu-types.controller';
import { MenuTypesService } from './menu-types.service';

describe('MenuTypesController', () => {
  let controller: MenuTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTypesController],
      providers: [MenuTypesService],
    }).compile();

    controller = module.get<MenuTypesController>(MenuTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
