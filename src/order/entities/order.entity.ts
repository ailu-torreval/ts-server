import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  merchant_id: number;

  @Column()
  contact_method: number; // 0 = bar pick up, 1 = table service

  @Column()
  ref_nr: number;

  @Column()
  payment_method: number; // 0 = card, 1 = Mobilepay

  @Column()
  payment_ref: number;

  @Column()
  date: Date;

  @Column()
  total_amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @OneToMany(() => OrderProduct, (order_product) => order_product.order)
  products: OrderProduct[];

  constructor(
    merchant_id: number,
    contact_method: number,
    ref_nr: number,
    payment_method: number,
    payment_ref: number,
    date: Date,
    total_amount: number,
    user: User,
    products: OrderProduct[],
  ) {
    this.merchant_id = merchant_id;
    this.contact_method = contact_method;
    this.ref_nr = ref_nr;
    this.payment_method = payment_method;
    this.payment_ref = payment_ref;
    this.date = date;
    this.total_amount = total_amount;
    this.user = user;
    this.products = products;
  }
}
