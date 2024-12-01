import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductOption {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    desc: string;
  
    @Column()
    price: number;

    @ManyToOne(() => Product, (product) => product.options)
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
