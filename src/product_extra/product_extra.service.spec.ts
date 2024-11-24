import { Test, TestingModule } from '@nestjs/testing';
import { ProductExtraService } from './product_extra.service';

describe('ProductExtraService', () => {
  let service: ProductExtraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductExtraService],
    }).compile();

    service = module.get<ProductExtraService>(ProductExtraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
