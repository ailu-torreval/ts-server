import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantTableService } from './merchant-table.service';
import { MerchantTableDto } from './dto/merchant-table.dto';

@Controller('merchant-table')
export class MerchantTableController {
  constructor(private readonly merchantTableService: MerchantTableService) {}

  @Post()
  create(@Body() createMerchantTableDto: MerchantTableDto) {
    return this.merchantTableService.create(createMerchantTableDto);
  }

  @Get()
  findAll() {
    return this.merchantTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantTableService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantTableDto: MerchantTableDto,
  ) {
    return this.merchantTableService.update(+id, updateMerchantTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantTableService.remove(+id);
  }
}
