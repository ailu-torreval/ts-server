import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  merchant_id: number;

  @Column()
  contact_method: number; // 0 = table service, 1 = bar pickup with push notification, 2 = bar pickup without app notification

  @Column()
  table_id: number;

  @Column()
  payment_method: number; // 0 = card, 1 = Mobilepay

  @Column()
  payment_ref: number;

  @Column()
  date: Date;

  @Column()
  total_amount: number;

  @Column()
  order_status: string; // 'pending', 'completed', 'cancelled' etc.

  @ManyToOne(() => User, (user) => user.orders)
  user: Partial<User>;

  @OneToMany(() => OrderProduct, (order_product) => order_product.order)
  products: OrderProduct[];

  constructor(
    merchant_id: number,
    contact_method: number,
    table_id: number,
    payment_method: number,
    payment_ref: number,
    date: Date,
    total_amount: number,
    order_status: string,
    user: User,
    products: OrderProduct[],
  ) {
    this.merchant_id = merchant_id;
    this.contact_method = contact_method;
    this.table_id = table_id;
    this.payment_method = payment_method;
    this.payment_ref = payment_ref;
    this.date = date;
    this.total_amount = total_amount;
    this.order_status = order_status;
    this.user = user;
    this.products = products;
  }
}
