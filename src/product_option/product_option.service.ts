import { Injectable } from '@nestjs/common';
import { CreateProductOptionDto } from './dto/product_option.dto';
import { UpdateProductOptionDto } from './dto/update-product_option.dto';

@Injectable()
export class ProductOptionService {
  create(createProductOptionDto: CreateProductOptionDto) {
    return 'This action adds a new productOption';
  }

  findAll() {
    return `This action returns all productOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOption`;
  }

  update(id: number, updateProductOptionDto: UpdateProductOptionDto) {
    return `This action updates a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
