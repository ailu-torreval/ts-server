import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { OrderProduct } from './entities/order_product.entity';
import { OrderProductDto } from './dto/order_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductExtra } from 'src/product_extra/entities/product_extra.entity';
import { ProductOption } from 'src/product_option/entities/product_option.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProdRepository: Repository<OrderProduct>,
    @InjectRepository(ProductExtra)
    private productExtraRepository: Repository<ProductExtra>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
  ) {}

  async create(createOrderProdDto: OrderProductDto, order?:Order): Promise<OrderProduct> {
    try {
      const { extras_ids, option_id, ...rest } = createOrderProdDto;
      let orderProd: Partial<OrderProduct> = rest;
      if(createOrderProdDto.extras_ids) {
        orderProd.extras = await this.productExtraRepository.find({
          where: { id: In(createOrderProdDto.extras_ids) },
        });
      }
      if(createOrderProdDto.option_id) {
        console.log('option_id', createOrderProdDto.option_id);
        orderProd.option = await this.productOptionRepository.findOne({where: { id:createOrderProdDto.option_id}});
        console.log('option', orderProd.option);
      }
      if(order){
        orderProd.order = order;
      }
      const createdOrderProd = await this.orderProdRepository.create(orderProd);
      console.log('createdOrderProd', createdOrderProd);

      return await this.orderProdRepository.save(createdOrderProd);

    } catch (error) {
      throw new InternalServerErrorException(`Error creating orderProduct, ${error}`);
    }
  }

  async createMany(createOrderProductDto: OrderProductDto[], order: Order): Promise<OrderProduct[]> {
    return await Promise.all(createOrderProductDto.map(async (orderProduct) => {
      return await this.create(orderProduct, order);
    }));
  }

  async findAll(): Promise<OrderProduct[]> {
    try {
      const orderProds = await this.orderProdRepository.find({ relations: ['extras', 'options'] });
      return orderProds;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orderProds' + error);
    }
    }

  async findOne(id: number): Promise<OrderProduct> {
    try {
      const orderProd = await this.orderProdRepository.findOne({where: {id}, relations: ['extras', 'options'] });
      return orderProd;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orderProd' + error);
    }
  }

  async update(id: number, updateOrderProdDto: OrderProductDto) {
    try {
      const updatedOrderProd = await this.orderProdRepository.update(id, updateOrderProdDto);
      if (updatedOrderProd.affected === 1) {
        return this.orderProdRepository.findOne({
          where: { id },
          relations: ['extras', 'options'],
        });
      }
    } catch (error) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }  }

  async remove(id: number): Promise<any> {
    try {
      const deletedOrderProd = await this.orderProdRepository.delete(id);
      if (deletedOrderProd.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`order prod with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }    }
}
