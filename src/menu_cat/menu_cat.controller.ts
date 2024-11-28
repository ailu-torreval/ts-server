import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MenuCatService } from './menu_cat.service';
import { MenuCatDto } from './dto/menu_cat.dto';

@Controller('menu-cat')
export class MenuCatController {
  constructor(private readonly menuCatService: MenuCatService) {}

  @Post()
  create(@Body() createMenuCatDto: MenuCatDto) {
    return this.menuCatService.create(createMenuCatDto);
  }

  @Get()
  findAll() {
    return this.menuCatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuCatService.findOne(+id);
  }

  @Get('merchant/:id')
  findByMerchant(@Param('id') id: string) {
    return this.menuCatService.findByMerchant(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuCatDto: MenuCatDto) {
    return this.menuCatService.update(+id, updateMenuCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCatService.remove(+id);
  }
}
