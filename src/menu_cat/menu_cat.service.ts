import { Injectable } from '@nestjs/common';
import { MenuCatDto } from './dto/menu_cat.dto';


@Injectable()
export class MenuCatService {
  create(menuCatDto: MenuCatDto) {
    return 'This action adds a new menuCat';
  }

  findAll() {
    return `This action returns all menuCat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuCat`;
  }

  update(id: number, menuCatDto: MenuCatDto) {
    return `This action updates a #${id} menuCat`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuCat`;
  }
}
