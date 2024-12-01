
import { Merchant } from "src/merchant/entities/merchant.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MenuCat {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    desc: string;
  
    @Column()
    order: number;
  
    @Column()
    icon: string;

    @OneToMany(() => Product, (product) => product.menu_cat)
    @JoinTable()
    products: Product[];

    @ManyToOne(() => Merchant, (merchant) => merchant.menu_cats)
    merchant: Merchant;
  
    constructor(
      name: string,
      desc: string,
      order: number,
      icon: string,
      merchant: Merchant
    ) {
        this.name = name;
        this.desc = desc;
        this.order = order;
        this.icon = icon;
        this.merchant = merchant;
    }
}
