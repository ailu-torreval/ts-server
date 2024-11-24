import { Test, TestingModule } from '@nestjs/testing';
import { ProductOptionController } from './product_option.controller';
import { ProductOptionService } from './product_option.service';

describe('ProductOptionController', () => {
  let controller: ProductOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOptionController],
      providers: [ProductOptionService],
    }).compile();

    controller = module.get<ProductOptionController>(ProductOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
