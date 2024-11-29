import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductExtraDto } from './dto/product_extra.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductExtra } from './entities/product_extra.entity';

@Injectable()
export class ProductExtraService {

  constructor(
    @InjectRepository(ProductExtra)
    private extraRepository: Repository<ProductExtra>,
  ) {}

  async create(createProductExtraDto: ProductExtraDto): Promise<ProductExtra> { 
    try {
      const productExtra = this.extraRepository.create(createProductExtraDto);
      return await this.extraRepository.save(productExtra);
    } catch(error) {
      throw new InternalServerErrorException('Error creating productExtra' + error);
    }
  }

  async findAll(): Promise<ProductExtra[]> {  
    try {
      const productExtras = await this.extraRepository.find();
      return productExtras;
    } catch(error) {
      throw new InternalServerErrorException('Error fetching productExtras' + error );
    }
  }

  async findOne(id: number): Promise<ProductExtra> {  
    try {
      const productExtra = await this.extraRepository.findOne({where: {id}});
      if(productExtra) {
        return productExtra;
      } else {
        throw new InternalServerErrorException(`ProductExtra with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException('Error fetching productExtra id' + id + error );
    }
  }

  async update(id: number, updateProductExtraDto: ProductExtraDto): Promise<ProductExtra> {  
    try {
      const updatedExtra = await this.extraRepository.update(id, updateProductExtraDto);
      if (updatedExtra.affected === 1) {
        return this.extraRepository.findOne({where: { id }});
      }
    } catch(error) {
      throw new InternalServerErrorException('Error updating productExtra' + error);
    }
  }

  async remove(id: number): Promise<any> { 
    try {
      const deletedExtra = await this.extraRepository.delete(id);
      if (deletedExtra.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`Extra with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }  
  }
}
