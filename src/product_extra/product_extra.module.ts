import { Module } from '@nestjs/common';
import { ProductExtraService } from './product_extra.service';
import { ProductExtraController } from './product_extra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductExtra } from './entities/product_extra.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ProductExtra])],
  controllers: [ProductExtraController],
  providers: [ProductExtraService],
  exports: [ProductExtraService],
})
export class ProductExtraModule {}
