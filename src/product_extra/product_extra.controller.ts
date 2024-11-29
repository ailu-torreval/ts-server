import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductExtraService } from './product_extra.service';
import { ProductExtraDto } from './dto/product_extra.dto';

@Controller('product-extra')
export class ProductExtraController {
  constructor(private readonly productExtraService: ProductExtraService) {}

  @Post()
  create(@Body() createProductExtraDto: ProductExtraDto) {
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductExtraDto: ProductExtraDto,
  ) {
    return this.productExtraService.update(+id, updateProductExtraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productExtraService.remove(+id);
  }
}
