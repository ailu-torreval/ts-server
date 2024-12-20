import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';import { OrderProductModule } from 'src/order_product/order_product.module';
import { OrderGateway } from './order.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderProductModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway],
  exports: [OrderService],
})
export class OrderModule {}
