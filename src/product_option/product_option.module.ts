import { Module } from '@nestjs/common';
import { ProductOptionService } from './product_option.service';
import { ProductOptionController } from './product_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOption } from './entities/product_option.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ProductOption])],
  controllers: [ProductOptionController],
  providers: [ProductOptionService],
  exports: [ProductOptionService],
})
export class ProductOptionModule {}
