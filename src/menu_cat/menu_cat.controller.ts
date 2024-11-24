import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuCatService } from './menu_cat.service';
import { CreateMenuCatDto } from './dto/create-menu_cat.dto';
import { UpdateMenuCatDto } from './dto/menu_cat.dto';

@Controller('menu-cat')
export class MenuCatController {
  constructor(private readonly menuCatService: MenuCatService) {}

  @Post()
  create(@Body() createMenuCatDto: CreateMenuCatDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuCatDto: UpdateMenuCatDto) {
    return this.menuCatService.update(+id, updateMenuCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCatService.remove(+id);
  }
}
