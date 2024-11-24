import { Product } from "src/product/entities/product.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class ProductExtra {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    desc: string;
  
    @Column()
    price: number;

    @ManyToOne(() => Product, (product) => product.extras)
    product: Product

    constructor(
        name: string,
        desc: string,
        price: number,
        product: Product
    ) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.product = product;
    }
}
