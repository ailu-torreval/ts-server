import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCatService } from './menu_cat.service';
import { MenuCatController } from './menu_cat.controller';
import { MenuCat } from './entities/menu_cat.entity';
import { Product } from 'src/product/entities/product.entity';
import { MerchantModule } from 'src/merchant/merchant.module';
import { Merchant } from 'src/merchant/entities/merchant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuCat, Merchant]),
    MerchantModule,
  ],
  controllers: [MenuCatController],
  providers: [MenuCatService],
  exports: [MenuCatService],
})
export class MenuCatModule {}