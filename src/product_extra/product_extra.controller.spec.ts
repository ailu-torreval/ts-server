import { Test, TestingModule } from '@nestjs/testing';
import { ProductExtraController } from './product_extra.controller';
import { ProductExtraService } from './product_extra.service';

describe('ProductExtraController', () => {
  let controller: ProductExtraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductExtraController],
      providers: [ProductExtraService],
    }).compile();

    controller = module.get<ProductExtraController>(ProductExtraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
