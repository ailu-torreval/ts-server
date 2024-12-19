import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MerchantDto } from './dto/merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { OrderService } from 'src/order/order.service';


@Injectable()
export class MerchantService {

  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    private orderService: OrderService,
  ) {}

  
  async create(createMerchantDto: MerchantDto): Promise<Merchant> {
    try {
      const merchant = this.merchantRepository.create(createMerchantDto);
      return await this.merchantRepository.save(merchant);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating merchant, ${error}`,
      );
    }
  }

  async findAll(): Promise<Merchant[]> {
    try {
      console.log(new Date().getTime());
      return await this.merchantRepository.find({relations: ['menu_cats', 'products', 'merchant_tables']});
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching merchants, ${error}`,
      );  
    }
  }

  async findOne(id: number): Promise<Merchant> {
    try {
      return await this.merchantRepository.findOne({where: {id}, relations: ['menu_cats', 'menu_cats.products','merchant_tables']});
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching merchant, ${error}`,
      );
    }
  }

  async findMerchant(id: number): Promise<{merchant:Merchant, suggested_products?: Product[]}> {
    try {
      const merchant = await this.merchantRepository.findOne({where: {id}, relations: ['menu_cats', 'menu_cats.products']});
      const suggested_products = merchant.menu_cats.reduce((acc, curr) => {
        return [...acc, ...curr.products.filter(p => p.is_suggestion)];
      }
      , []);
      if(suggested_products.length > 0) {
        return {merchant, suggested_products};
      } else {
        return {merchant};
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching merchant, ${error}`,
      );
    }
  }

  async findMerchantByAdminId(admin_id: number): Promise<Merchant> {
    try {
      console.log("fetching merchant by admin id", admin_id);
      const merchant = await this.merchantRepository.findOne({
        where: { admin_id },
        relations: [
          'menu_cats',
          'menu_cats.products',
          'menu_cats.products.extras',
          'menu_cats.products.options',
        ],
      });
      console.log("merchant fetched by admin id");


      if (!merchant) {
        throw new InternalServerErrorException(`Merchant not found for admin id ${admin_id}`);
      }

      // Fetch orders separately based on merchant_id
      const orders = await this.orderService.getMerchantOrders(merchant.id);

      merchant.orders = orders;
      return merchant;
      
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching merchant, ${error}`,
      );
    }
  }

  async update(id: number, updateMerchantDto: MerchantDto): Promise<Merchant> {
    try {
      const updatedMerchant = await this.merchantRepository.update(id, updateMerchantDto);
      if (updatedMerchant.affected === 1) {
        return this.merchantRepository.findOne({
          where: { id },
          relations: ['menu_cats', 'products', 'merchant_tables'],
        });
      }
    } catch (error) {
      throw new NotFoundException(`Merchant with id ${id} not found`);
    } 
   }

  async remove(id: number) {
    try {
      const deletedMerchant = await this.merchantRepository.delete(id);
      if (deletedMerchant.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`Merchant with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
