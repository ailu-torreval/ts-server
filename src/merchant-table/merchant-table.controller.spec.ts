import { Test, TestingModule } from '@nestjs/testing';
import { MerchantTableController } from './merchant-table.controller';
import { MerchantTableService } from './merchant-table.service';

describe('MerchantTableController', () => {
  let controller: MerchantTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantTableController],
      providers: [MerchantTableService],
    }).compile();

    controller = module.get<MerchantTableController>(MerchantTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
