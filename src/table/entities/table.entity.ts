import { Merchant } from "src/merchant/entities/merchant.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Table {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    table_code: string;
  
    @Column()
    capacity: number;

    @ManyToOne(() => Merchant, (merchant) => merchant.tables)
    merchant: Merchant;

    constructor(
        table_code: string,
        capacity: number,
        merchant: Merchant
    ) {
        this.table_code = table_code;
        this.capacity = capacity;
        this.merchant = merchant;
    }
}
