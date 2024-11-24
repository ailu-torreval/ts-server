import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductExtraService } from './product_extra.service';
import { CreateProductExtraDto } from './dto/product_extra.dto';
import { UpdateProductExtraDto } from './dto/update-product_extra.dto';

@Controller('product-extra')
export class ProductExtraController {
  constructor(private readonly productExtraService: ProductExtraService) {}

  @Post()
  create(@Body() createProductExtraDto: CreateProductExtraDto) {
    return this.productExtraService.create(createProductExtraDto);
  }

  @Get()
  findAll() {
    return this.productExtraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productExtraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductExtraDto: UpdateProductExtraDto,
  ) {
    return this.productExtraService.update(+id, updateProductExtraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productExtraService.remove(+id);
  }
}
