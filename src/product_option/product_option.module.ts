import { Module } from '@nestjs/common';
import { ProductOptionService } from './product_option.service';
import { ProductOptionController } from './product_option.controller';

@Module({
  controllers: [ProductOptionController],
  providers: [ProductOptionService],
})
export class ProductOptionModule {}
