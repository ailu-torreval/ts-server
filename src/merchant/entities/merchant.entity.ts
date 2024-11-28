import { MenuCat } from 'src/menu_cat/entities/menu_cat.entity';
import { Product } from 'src/product/entities/product.entity';
import { Table } from 'src/table/entities/table.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => MenuCat, (menu_cat) => menu_cat.merchant)
  menu_cats: MenuCat[];

  @OneToMany(() => Product, (product) => product.merchant)
  products: Product[];

  @OneToMany(() => Table, (table) => table.merchant)
  tables: Table[];

  constructor(
    admin_id: number,
    name: string,
    desc: string,
    is_table_service: boolean,
    tables: Table[],
    menu_cats: MenuCat[],
    products: Product[]
  ) {
    this.admin_id = admin_id;
    this.name = name;
    this.desc = desc;
    this.is_table_service = is_table_service;
    this.tables = tables;
    this.menu_cats = menu_cats;
    this.products = products;
  }
}
