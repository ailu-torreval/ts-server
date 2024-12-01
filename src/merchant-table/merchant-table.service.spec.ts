import { Test, TestingModule } from '@nestjs/testing';
import { MerchantTableService } from './merchant-table.service';

describe('MerchantTableService', () => {
  let service: MerchantTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantTableService],
    }).compile();

    service = module.get<MerchantTableService>(MerchantTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
