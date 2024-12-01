import { MenuCat } from 'src/menu_cat/entities/menu_cat.entity';
import { MerchantTable } from 'src/merchant-table/entities/merchant-table.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  admin_id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  is_table_service: boolean;

  @OneToMany(() => MenuCat, (menuCat) => menuCat.merchant)
  menu_cats: MenuCat[];

  @OneToMany(() => Product, (product) => product.merchant)
  products: Product[];

  @OneToMany(() => MerchantTable, (table) => table.merchant)
  merchant_tables: MerchantTable[];

  constructor(
    admin_id: number,
    name: string,
    desc: string,
    is_table_service: boolean,
    menu_cats: MenuCat[],
    products: Product[]
  ) {
    this.admin_id = admin_id;
    this.name = name;
    this.desc = desc;
    this.is_table_service = is_table_service;
    this.menu_cats = menu_cats;
    this.products = products;
  }
}
