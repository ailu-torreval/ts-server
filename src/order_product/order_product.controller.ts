import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderProductService } from './order_product.service';
import { OrderProductDto } from './dto/order_product.dto';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  create(@Body() createOrderProductDto: OrderProductDto) {
    return this.orderProductService.create(createOrderProductDto);
  }

  @Get()
  findAll() {
    return this.orderProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderProductService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderProductDto: OrderProductDto,
  ) {
    return this.orderProductService.update(+id, updateOrderProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderProductService.remove(+id);
  }
}
