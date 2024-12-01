import { Order } from "src/order/entities/order.entity";
import { ProductExtra } from "src/product_extra/entities/product_extra.entity";
import { ProductOption } from "src/product_option/entities/product_option.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    product_id: number;
    
    @Column()
    name: string;
    
    @Column()
    price: number;
    
    @Column()
    total_amount: number;

    @Column()
    note: string;

    @ManyToMany(() => ProductExtra)
    @JoinTable()
    extras: ProductExtra[]

    @ManyToOne(() => ProductOption)
    @JoinTable()
    option: ProductOption; // No plural here
    
    @ManyToOne(() => Order, (order) => order.products)
    @JoinTable()
    order: Order

    constructor(
        product_id: number,
        price: number,
        name:string,
        note: string,
        extras: ProductExtra[],
        option: ProductOption,
        order: Order
    ) {
        this.product_id = product_id;
        this.name = name;
        this.price = price;
        this.note = note;
        this.extras = extras;
        this.option = option;
        this.order = order;
    }
}
