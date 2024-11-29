import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductOptionService } from './product_option.service';
import { ProductOptionDto } from './dto/product_option.dto';


@Controller('product-option')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) {}

  @Post()
  create(@Body() createProductOptionDto: ProductOptionDto) {
    return this.productOptionService.create(createProductOptionDto);
  }

  @Get()
  findAll() {
    return this.productOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductOptionDto: ProductOptionDto,
  ) {
    return this.productOptionService.update(+id, updateProductOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOptionService.remove(+id);
  }
}
