import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MerchantDto } from './dto/merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MerchantService {

  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>
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
