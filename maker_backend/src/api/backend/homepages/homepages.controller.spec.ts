import { Test, TestingModule } from '@nestjs/testing';
import { HomepagesController } from './homepages.controller';
import { HomepagesService } from './homepages.service';

describe('HomepagesController', () => {
  let controller: HomepagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomepagesController],
      providers: [HomepagesService],
    }).compile();

    controller = module.get<HomepagesController>(HomepagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
