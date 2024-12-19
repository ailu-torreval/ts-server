import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { OrderProductService } from 'src/order_product/order_product.service';
import { OrderGateway } from './order.gateway';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UserService,
    private orderProductService: OrderProductService,
    private orderGateway: OrderGateway,
  ) {}

  async create(createOrderDto: OrderDto): Promise<Order> {
    try {
      const { user_id, order_products, ...rest } = createOrderDto;
      console.log(user_id)
      let user;
      if(user_id) {
        user = await this.userService.findOne(user_id);
      } else {
        user = null;
      }
      const order = this.orderRepository.create({...rest, date: new Date(rest.date), user});
      const createdOrder = await this.orderRepository.save(order);
      console.log(createdOrder)
      const orderProducts = await this.orderProductService.createMany(
        order_products,
        createdOrder,
      );
      const orderObject = await this.orderRepository.findOne({
        where: { id: createdOrder.id },
        relations: ['products', 'products.extras', 'products.option'],
      })
      // setTimeout(() => {
      //   this.changeStatus(createdOrder.id, 'accepted');
      // }
      // , 10000);
      return orderObject;
    } catch (error) {
      throw new InternalServerErrorException(`Error creating order, ${error}`);
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user', 'products', 'products.extras', 'products.option'],
      });
      return orders;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orders' + error);
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      const selectedOrder = await this.orderRepository.findOne({
        where: { id },
        relations: ['user'],
        join: {
          alias: 'order',
          leftJoinAndSelect: {
            products: 'order.products',
            product_extras: 'product.extras',
            product_options: 'products.options',
          }}
      });
      if (selectedOrder) {
        return selectedOrder;
      } else {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orders' + error);
    }
  }

  async update(id: number, updateOrderDto: Partial<OrderDto>): Promise<Order> {
    try {
      const updatedOrder = await this.orderRepository.update(id, updateOrderDto);
      if (updatedOrder.affected === 1) {
        return this.orderRepository.findOne({
          where: { id },
          relations: ['user'],
          join: {
            alias: 'order',
            leftJoinAndSelect: {
              products: 'order.products',
              product_extras: 'product.extras',
              product_options: 'products.options',
            }}
        });
      } else {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error updating order  ' + error);
    }
  }

  async getMerchantOrders(merchant_id: number): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        where: { merchant_id },
        relations: ['user', 'products', 'products.extras', 'products.option'],
      });
      return orders;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orders' + error);
    }
  }

  async changeStatus(id: number, status: string): Promise<any> {
    try {
      const updatedOrder = await this.orderRepository.update(id, { order_status: status });
      if (updatedOrder.affected === 1) {
        await this.orderGateway.emitOrderChanged(id.toString(), status);
        console.log('Order status changed socket emitted for order', id);
        const order = await this.orderRepository.findOne({
          where: { id },
          relations: ['products', 'products.option', 'products.extras'],
        });

        return order;
     } else {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error updating order  ' + error);
    }
  }

  async remove(id: number): Promise<any> {
    return `This action removes a #${id} order`;
  }
}
