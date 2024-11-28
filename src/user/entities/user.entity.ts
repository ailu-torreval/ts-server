import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from './role';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  notification_token: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  role: Role;

  @Column()
  dob: Date;

  @Column()
  phone_nr: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  constructor(
    firstname: string,
    lastname: string,
    notification_token: string,
    password: string,
    email: string,
    dob: Date,
    phone_nr: string,
    role?: Role,
    orders?: Order[],
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.notification_token = notification_token;
    this.password = password;
    this.email = email;
    this.dob = dob;
    this.phone_nr = phone_nr;
    this.role = role || Role.User;
    this.orders = orders || [];
  }
}
