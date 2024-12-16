import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { MerchantService } from 'src/merchant/merchant.service';
import { ProductExtraService } from 'src/product_extra/product_extra.service';
import { ProductOptionService } from 'src/product_option/product_option.service';
import { MenuCat } from 'src/menu_cat/entities/menu_cat.entity';


@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(MenuCat)
    private menuCatRepository: Repository<MenuCat>,
    private extraService: ProductExtraService,
    private optionService: ProductOptionService,
  ) {}


  async create(createProductDto: ProductDto): Promise<Product> {
    try {
      const { merchant_id, menu_cat_id, extras, options, ...rest } = createProductDto;
      let product: Partial<Product> = rest;
      product.menu_cat = await this.menuCatRepository.findOne({where: {id: menu_cat_id}});
      product.merchant = await this.merchantRepository.findOne({where: {id: merchant_id}});
      const p = await this.productRepository.create(product);
      let prodExtras;
      let prodOptions;
      console.log('extras', extras);
      console.log('options', options);
      if(extras.length > 0) {
        prodExtras = Promise.all(extras.map(async (extra) => await this.extraService.create(extra)));
      }
      if(product.has_options) {
        prodOptions = Promise.all(options.map(async (option) => await this.optionService.create(option)));
      }
      console.log('prodExtras', prodExtras);
      console.log('prodOptions', prodOptions);
      
      p.extras = await prodExtras;
      p.options = await prodOptions;
      
      return  await this.productRepository.save(p);

    } catch(error) {
      throw new InternalServerErrorException('Error creating product' + error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({ relations: ['merchant', 'option', 'extras'] });
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products' + error);
    }
    }

  async findOne(id: number): Promise<Product> {
    const selectedProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['options', 'extras'] });
    if (selectedProduct) {
      return selectedProduct;
    } else {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    }

  async update(id: number, updateProductDto: ProductDto): Promise<Product> {
    try {
      const updatedProd = await this.productRepository.update(id, updateProductDto);
      if (updatedProd.affected === 1) {
        return this.productRepository.findOne({
          where: { id },
          relations: ['merchant', 'option', 'extras'],
        });
      }
    } catch (error) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      const deletedProd = await this.productRepository.delete(id);
      if (deletedProd.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
