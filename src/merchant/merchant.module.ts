import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Merchant]), OrderModule],
  controllers: [MerchantController],
  providers: [MerchantService],
  exports: [MerchantService],
})
export class MerchantModule {}
