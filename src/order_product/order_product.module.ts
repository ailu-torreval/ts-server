import { Module } from '@nestjs/common';
import { OrderProductService } from './order_product.service';
import { OrderProductController } from './order_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order_product.entity';
import { ProductExtra } from 'src/product_extra/entities/product_extra.entity';
import { ProductOption } from 'src/product_option/entities/product_option.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([OrderProduct, ProductExtra, ProductOption])],
  controllers: [OrderProductController],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
