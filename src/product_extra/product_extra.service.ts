import { Injectable } from '@nestjs/common';
import { CreateProductExtraDto } from './dto/product_extra.dto';
import { UpdateProductExtraDto } from './dto/update-product_extra.dto';

@Injectable()
export class ProductExtraService {
  create(createProductExtraDto: CreateProductExtraDto) {
    return 'This action adds a new productExtra';
  }

  findAll() {
    return `This action returns all productExtra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productExtra`;
  }

  update(id: number, updateProductExtraDto: UpdateProductExtraDto) {
    return `This action updates a #${id} productExtra`;
  }

  remove(id: number) {
    return `This action removes a #${id} productExtra`;
  }
}
