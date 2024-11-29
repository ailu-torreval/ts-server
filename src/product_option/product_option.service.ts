import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductOptionDto } from './dto/product_option.dto';
import { ProductOption } from './entities/product_option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductOptionService {

  constructor(
    @InjectRepository(ProductOption)
    private optionRepository: Repository<ProductOption>,
  ) {}
  
  async create(createProductOptionDto: ProductOptionDto): Promise<ProductOption> {
    try {
      const productOption = this.optionRepository.create(createProductOptionDto);
      return await this.optionRepository.save(productOption);
    } catch(error) {
      throw new InternalServerErrorException('Error creating productOption' + error);
    }
  }

  async findAll(): Promise<ProductOption[]> {
    try {
      const productOption = await this.optionRepository.find();
      return productOption;
    } catch(error) {
      throw new InternalServerErrorException('Error fetching productOption' + error );
    }
  }

  async findOne(id: number): Promise<ProductOption> {
    try {
      const productOption = await this.optionRepository.findOne({where: {id}});
      if(productOption) {
        return productOption;
      } else {
        throw new InternalServerErrorException(`ProductOption with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException('Error fetching productOption id' + id + error );
    }
  }

  async update(id: number, updateProductOptionDto: ProductOptionDto): Promise<ProductOption> {
    try {
      const updatedOption = await this.optionRepository.update(id, updateProductOptionDto);
      if (updatedOption.affected === 1) {
        return this.optionRepository.findOne({where: { id }});
      }
    } catch(error) {
      throw new InternalServerErrorException('Error updating productOption' + error);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const deletedOption = await this.optionRepository.delete(id);
      if (deletedOption.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`Option with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }  
  }
}
