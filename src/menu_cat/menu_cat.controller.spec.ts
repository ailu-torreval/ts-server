import { Test, TestingModule } from '@nestjs/testing';
import { MenuCatController } from './menu_cat.controller';
import { MenuCatService } from './menu_cat.service';

describe('MenuCatController', () => {
  let controller: MenuCatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCatController],
      providers: [MenuCatService],
    }).compile();

    controller = module.get<MenuCatController>(MenuCatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
