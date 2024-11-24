import { Menu_cat } from "src/menu_cat/entities/menu_cat.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductExtra } from "src/product_extra/entities/product_extra.entity";
import { ProductOption } from "src/product_option/entities/product_option.entity";
import { Merchant } from "src/merchant/entities/merchant.entity";

export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    desc: string;

    @Column()
    price: number;

    @Column()
    offer_price: number;

    @Column()
    is_offer: boolean;

    @Column()
    has_options: boolean;
      
    @Column()
    highlight_txt: string;

    @Column()
    is_suggestion: boolean;

    @Column()
    option_title: string;

    @ManyToOne(() => Merchant, (merchant) => merchant.products)
    merchant: Merchant;

    @ManyToOne(() => Menu_cat, (menu_cat) => menu_cat.products)
    menu_cat: Menu_cat;

    @OneToMany(() => ProductOption, (product_option) => product_option.product)
    options: ProductOption[]

    @OneToMany(() => ProductExtra, (product_extra) => product_extra.product)
    extras: ProductExtra[]

    constructor(
        name: string,
        desc: string,
        price: number,
        offer_price: number,
        is_offer: boolean,
        has_options: boolean,
        highlight_txt: string,
        is_suggestion: boolean,
        menu_cat: Menu_cat,
        merchant: Merchant,
        options: ProductOption[],
        extras: ProductExtra[],
        option_title?: string
        ) {
            this.name = name;
            this.desc = desc;
            this.price = price;
            this.offer_price = offer_price;
            this.is_offer = is_offer;
            this.has_options = has_options;
            this.highlight_txt = highlight_txt;
            this.is_suggestion = is_suggestion;
            this.option_title = option_title;
            this.menu_cat = menu_cat;
            this.merchant = merchant;
            this.options = options;
            this.extras = extras;
        }
    

}
