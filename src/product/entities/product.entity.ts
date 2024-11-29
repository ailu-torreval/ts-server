import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductExtra } from "src/product_extra/entities/product_extra.entity";
import { ProductOption } from "src/product_option/entities/product_option.entity";
import { Merchant } from "src/merchant/entities/merchant.entity";
import { MenuCat } from "src/menu_cat/entities/menu_cat.entity";

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

    @ManyToOne(() => MenuCat, (menu_cat) => menu_cat.products)
    menu_cat: MenuCat;

    @OneToMany(() => ProductOption, (product_option) => product_option.product)
    @JoinColumn()
    option: ProductOption;
    
    @OneToMany(() => ProductExtra, (product_extra) => product_extra.product)
    @JoinColumn()
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
        menu_cat: MenuCat,
        merchant: Merchant,
        option: ProductOption,
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
            this.option = option;
            this.extras = extras;
        }
    

}
