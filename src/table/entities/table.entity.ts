import { Merchant } from "src/merchant/entities/merchant.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Table {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    table_code: string;

    @ManyToOne(() => Merchant, (merchant) => merchant.tables)
    merchant: Merchant;

    constructor(
        table_code: string,
        merchant: Merchant
    ) {
        this.table_code = table_code;
        this.merchant = merchant;
    }
}
