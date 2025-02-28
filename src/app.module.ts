import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MerchantModule } from './merchant/merchant.module';
import { ProductModule } from './product/product.module';
import { ProductOptionModule } from './product_option/product_option.module';
import { ProductExtraModule } from './product_extra/product_extra.module';
import { MenuCatModule } from './menu_cat/menu_cat.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order_product/order_product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data.source';
import { MerchantTableModule } from './merchant-table/merchant-table.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UserModule,
    MerchantModule,
    ProductModule,
    ProductOptionModule,
    ProductExtraModule,
    MenuCatModule,
    OrderModule,
    OrderProductModule,
    MerchantTableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}