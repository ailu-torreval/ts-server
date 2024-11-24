import { Injectable } from '@nestjs/common';
import { CreateMenuCatDto } from './dto/create-menu_cat.dto';
import { UpdateMenuCatDto } from './dto/menu_cat.dto';

@Injectable()
export class MenuCatService {
  create(createMenuCatDto: CreateMenuCatDto) {
    return 'This action adds a new menuCat';
  }

  findAll() {
    return `This action returns all menuCat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuCat`;
  }

  update(id: number, updateMenuCatDto: UpdateMenuCatDto) {
    return `This action updates a #${id} menuCat`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuCat`;
  }
}
