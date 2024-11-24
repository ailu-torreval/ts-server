import { Order } from "src/order/entities/order.entity";
import { ProductExtra } from "src/product_extra/entities/product_extra.entity";
import { ProductOption } from "src/product_option/entities/product_option.entity";
import { Column, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    product_extras: ProductExtra[]

    @ManyToMany(() => ProductOption)
    @JoinTable()
    product_options: ProductOption[]

    @ManyToOne(() => Order, (order) => order.products)
    order: Order

    constructor(
        product_id: number,
        price: number,
        name:string,
        note: string,
        product_extras: ProductExtra[],
        product_options: ProductOption[],
        order: Order
    ) {
        this.product_id = product_id;
        this.name = name;
        this.price = price;
        this.note = note;
        this.product_extras = product_extras;
        this.product_options = product_options;
        this.order = order;
    }
}
