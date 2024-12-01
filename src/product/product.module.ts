import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductExtraService } from 'src/product_extra/product_extra.service';
import { ProductOptionService } from 'src/product_option/product_option.service';
import { ProductExtra } from 'src/product_extra/entities/product_extra.entity';
import { ProductOption } from 'src/product_option/entities/product_option.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductExtra, ProductOption, Merchant])],
  controllers: [ProductController],
  providers: [ProductService, ProductExtraService, ProductOptionService],
  exports: [ProductService],
})
export class ProductModule {}
