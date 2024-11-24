import { Test, TestingModule } from '@nestjs/testing';
import { MenuCatService } from './menu_cat.service';

describe('MenuCatService', () => {
  let service: MenuCatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuCatService],
    }).compile();

    service = module.get<MenuCatService>(MenuCatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
