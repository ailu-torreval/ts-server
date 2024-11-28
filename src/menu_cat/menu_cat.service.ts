import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MenuCatDto } from './dto/menu_cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuCat } from './entities/menu_cat.entity';
import { Repository } from 'typeorm';
import { MerchantService } from 'src/merchant/merchant.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class MenuCatService {
  constructor(
    @InjectRepository(MenuCat)
    private menuCatRepository: Repository<MenuCat>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private merchantService: MerchantService,
  ) {}

  async create(menuCatDto: MenuCatDto): Promise<MenuCat> {
    try {
      const merchant = await this.merchantService.findOne(
        menuCatDto.merchant_id,
      );
      const { merchant_id, ...rest } = menuCatDto;
      const newMenuCat = this.menuCatRepository.create({ ...rest, merchant });
      const savedMenuCat = await this.menuCatRepository.save(newMenuCat);
      return savedMenuCat;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating menu cat, ${error}`,
      );
    }
  }

  async findAll(): Promise<MenuCat[]> {
    try {
      const menu_cats = await this.menuCatRepository.find({
        relations: ['merchant', 'products'],
      });
      return menu_cats;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching menu_cats, ${error}`,
      );
    }
  }

  async findOne(id: number): Promise<MenuCat> {
    const selectedMenuCat = await this.menuCatRepository.findOne({
      where: { id },
      relations: ['merchant', 'products'],
    });
    if (selectedMenuCat) {
      return selectedMenuCat;
    } else {
      throw new NotFoundException(`menuCat with id ${id} not found`);
    }
  }

  async findByMerchant(merchant_id: number): Promise<MenuCat[]> {
  
    try {
      const merchant = await this.merchantService.findOne(merchant_id);
      const menu_cats = await this.menuCatRepository.find({
        where: { merchant },
        relations: ['merchant', 'products'],
      });
      return menu_cats;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching menu_cats, ${error}`,
      );
    }
  }

  async update(id: number, menuCatDto: MenuCatDto): Promise<MenuCat> {
    try {
      const merchant = await this.merchantService.findOne(menuCatDto.merchant_id);

      const updatedMenuCat = await this.menuCatRepository.update(id, {
        ...menuCatDto,
        merchant,
      });

      if (updatedMenuCat.affected === 1) {
        return this.menuCatRepository.findOne({
          where: { id },
          relations: ['merchant', 'products'],
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating menuCat, ${error}`,
      );
    }
    }

  async remove(id: number): Promise<any> {
    const deletedMenuCat = await this.menuCatRepository.delete(id);
    if (deletedMenuCat.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }  }
}
