import { Module } from '@nestjs/common';
import { MerchantTableService } from './merchant-table.service';
import { MerchantTableController } from './merchant-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { MerchantTable } from './entities/merchant-table.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([MerchantTable, Merchant])],
  controllers: [MerchantTableController],
  providers: [MerchantTableService],
  exports: [MerchantTableService]
})
export class MerchantTableModule {}
